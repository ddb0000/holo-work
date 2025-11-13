import { HandlerContext } from './types';
import { all } from './db';
import { ensure, nowMs, jsonResponse, etagHex } from './utils';
import { requireRoomMembership } from './access';
import { cacheGet, cacheSet } from './cache';
import { summarizeReadings } from './iot';

type DashboardPayload = {
  messages: Array<{ id: string; body: string; created_at: number; user_id: string; email?: string | null }>;
  tasks: Array<{ id: string; title: string; status: string; assignee_id: string | null; created_at: number }>;
  readings: { summary: Record<string, unknown> | null; readings: Array<{ id: string; device_id: string; t_c: number | null; noise_db: number | null; lux: number | null; created_at: number }> };
  suggestions: Array<{ id: string; kind: string; text: string; created_at: number }>;
  presence: Array<{ user_id: string; email?: string | null; status: string; mood: number | null; energy: number | null; updated_at: number }>;
};

const CACHE_TTL = 10_000;

export async function handleDashboard(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const cacheKey = `dash:${resolvedRoomId}`;
  const cachedEntry = cacheGet<{ etag: string; body: DashboardPayload }>(cacheKey);
  const ifNoneMatch = ctx.request.headers.get('if-none-match');
  if (cachedEntry) {
    if (ifNoneMatch && ifNoneMatch === cachedEntry.etag) {
      return new Response(null, { status: 304, headers: { ETag: cachedEntry.etag } });
    }
    const cachedResponse = jsonResponse(cachedEntry.body, {
      headers: { 'Cache-Control': 'public, max-age=10, stale-while-revalidate=300' },
    });
    cachedResponse.headers.set('ETag', cachedEntry.etag);
    return cachedResponse;
  }

  const since15 = nowMs() - 15 * 60 * 1000;
  const since30 = nowMs() - 30 * 60 * 1000;
  const [messages, tasks, readings, suggestions, presence] = await Promise.all([
    all(ctx.env.DB,
      `SELECT m.id, m.body, m.created_at, m.user_id, u.email
       FROM messages m
       JOIN users u ON u.id = m.user_id
       WHERE m.room_id = ?
       ORDER BY m.created_at DESC
       LIMIT 50`,
      [resolvedRoomId]
    ),
    all(ctx.env.DB,
      `SELECT id, title, status, assignee_id, created_at
       FROM tasks
       WHERE room_id = ?
       ORDER BY created_at DESC`,
      [resolvedRoomId]
    ),
    all(ctx.env.DB,
      `SELECT id, device_id, t_c, noise_db, lux, created_at
       FROM readings
       WHERE room_id = ? AND created_at >= ?
       ORDER BY created_at DESC
       LIMIT 200`,
      [resolvedRoomId, since15]
    ),
    all(ctx.env.DB,
      `SELECT id, kind, text, created_at
       FROM suggestions
       WHERE room_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [resolvedRoomId]
    ),
    all(ctx.env.DB,
      `SELECT p.user_id, u.email, p.status, p.mood, p.energy, p.updated_at
       FROM presence p
       LEFT JOIN users u ON u.id = p.user_id
       WHERE p.room_id = ? AND p.updated_at >= ?
       ORDER BY p.updated_at DESC`,
      [resolvedRoomId, since30]
    ),
  ]);

  const orderedReadings = [...readings].reverse();
  const summary = summarizeReadings(orderedReadings);
  const payload: DashboardPayload = {
    messages: messages.reverse(),
    tasks,
    readings: { summary, readings: orderedReadings },
    suggestions,
    presence,
  };
  const etag = await etagHex(JSON.stringify(payload));
  cacheSet(cacheKey, { etag, body: payload }, CACHE_TTL);
  if (ifNoneMatch && ifNoneMatch === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }
  const response = jsonResponse(payload, {
    headers: { 'Cache-Control': 'public, max-age=10, stale-while-revalidate=300' },
  });
  response.headers.set('ETag', etag);
  return response;
}

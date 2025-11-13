import { HandlerContext } from './types';
import { readJson, jsonResponse, ensure, slugify, randomId, escapeHtml, clamp, nowMs } from './utils';
import { all, first, run } from './db';
import { allow } from './ratelimit';
import { computeSuggestions } from './agent';
import { requireRoomMembership } from './access';

export async function handleListRooms(ctx: HandlerContext): Promise<Response> {
  const rooms = await all<{ id: string; name: string; slug: string; map_seed: string }>(
    ctx.env.DB,
    'SELECT id, name, slug, map_seed FROM rooms ORDER BY created_at ASC'
  );
  return jsonResponse({ rooms });
}

export async function handleGetRoom(ctx: HandlerContext): Promise<Response> {
  const { roomId } = ctx.params;
  const room = await first<{ id: string; name: string; slug: string; map_seed: string }>(
    ctx.env.DB,
    'SELECT id, name, slug, map_seed FROM rooms WHERE id = ? OR slug = ?',
    [roomId, roomId]
  );
  ensure(room, 404, 'Room not found');
  return jsonResponse({ room });
}

export async function handleCreateRoom(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');
  const body = await readJson<{ name?: string; map_seed?: string }>(ctx.request);
  const name = body.name?.trim();
  ensure(name && name.length >= 3, 400, 'Room name required');
  const baseSlug = slugify(name) || `room-${randomId('slug').split('_')[1]}`;
  let slug = baseSlug;
  let attempt = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const exists = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE slug = ?', [slug]);
    if (!exists) break;
    slug = `${baseSlug}-${attempt++}`;
  }
  const id = crypto.randomUUID();
  await run(
    ctx.env.DB,
    'INSERT INTO rooms (id, name, slug, map_seed, created_at) VALUES (?, ?, ?, ?, ?)',
    [id, name, slug, body.map_seed ?? null, nowMs()]
  );
  return jsonResponse({ room: { id, name, slug, map_seed: body.map_seed ?? null } }, { status: 201 });
}

export async function handleJoinRoom(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const room = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomId, roomId]);
  ensure(room, 404, 'Room not found');
  await run(
    ctx.env.DB,
    'INSERT OR IGNORE INTO room_members (user_id, room_id, joined_at) VALUES (?, ?, ?)',
    [ctx.user!.id, room!.id, nowMs()]
  );
  return jsonResponse({ joined: true });
}

export async function handleListMessages(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const url = new URL(ctx.request.url);
  const cursor = Number(url.searchParams.get('cursor') ?? '0');
  const limit = clamp(Number(url.searchParams.get('limit') ?? '50'), 1, 200);
  const rows = await all<{
    id: string;
    body: string;
    created_at: number;
    user_id: string;
    email: string;
  }>(
    ctx.env.DB,
    `SELECT m.id, m.body, m.created_at, u.id as user_id, u.email
     FROM messages m
     JOIN users u ON u.id = m.user_id
     WHERE m.room_id = ? AND m.created_at < CASE WHEN ? = 0 THEN 9223372036854775807 ELSE ? END
     ORDER BY m.created_at DESC
     LIMIT ?`,
    [resolvedRoomId, cursor, cursor, limit]
  );
  return jsonResponse({
    messages: rows.reverse(),
    nextCursor: rows.length ? rows[0].created_at : null,
  });
}

export async function handlePostMessage(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const body = await readJson<{ body?: string }>(ctx.request, 2 * 1024);
  const message = body.body?.trim();
  ensure(message && message.length, 400, 'Message body required');
  ensure(message.length <= 512, 400, 'Message too long');
  const throttleKey = `msg:${ctx.user!.id}:${resolvedRoomId}`;
  const allowed = allow(throttleKey, 2);
  ensure(allowed, 429, 'Slow down');
  const html = escapeHtml(message);
  const id = crypto.randomUUID();
  const createdAt = nowMs();
  await run(ctx.env.DB, 'INSERT INTO messages (id, room_id, user_id, body, created_at) VALUES (?, ?, ?, ?, ?)', [
    id,
    resolvedRoomId,
    ctx.user!.id,
    html,
    createdAt,
  ]);
  return jsonResponse({ message: { id, body: html, created_at: createdAt } }, { status: 201 });
}

export async function handleListTasks(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const tasks = await all<{
    id: string;
    title: string;
    status: string;
    assignee_id: string | null;
    created_at: number;
  }>(
    ctx.env.DB,
    'SELECT id, title, status, assignee_id, created_at FROM tasks WHERE room_id = ? ORDER BY created_at DESC',
    [resolvedRoomId]
  );
  return jsonResponse({ tasks });
}

export async function handleCreateTask(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const body = await readJson<{ title?: string; assignee_id?: string }>(ctx.request);
  const title = body.title?.trim();
  ensure(title && title.length >= 3, 400, 'Task title required');
  const id = crypto.randomUUID();
  await run(
    ctx.env.DB,
    'INSERT INTO tasks (id, room_id, title, status, assignee_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [id, resolvedRoomId, title, 'todo', body.assignee_id ?? null, nowMs()]
  );
  return jsonResponse({ task: { id, title, status: 'todo', assignee_id: body.assignee_id ?? null } }, { status: 201 });
}

export async function handleUpdateTask(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { taskId } = ctx.params;
  const task = await first<{ id: string; room_id: string }>(ctx.env.DB, 'SELECT id, room_id FROM tasks WHERE id = ?', [taskId]);
  ensure(task, 404, 'Task not found');
  await requireRoomMembership(ctx.env, task!.room_id, ctx.user!.id);
  const body = await readJson<{ status?: string; assignee_id?: string | null }>(ctx.request);
  const status = body.status ?? undefined;
  if (status) {
    ensure(['todo', 'doing', 'done'].includes(status), 400, 'Invalid status');
  }
  await run(
    ctx.env.DB,
    'UPDATE tasks SET status = COALESCE(?, status), assignee_id = ? WHERE id = ?',
    [status ?? null, body.assignee_id ?? null, taskId]
  );
  const updated = await first(ctx.env.DB, 'SELECT id, room_id, title, status, assignee_id FROM tasks WHERE id = ?', [taskId]);
  return jsonResponse({ task: updated });
}

export async function handlePostCheckin(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const body = await readJson<{ mood?: number; energy?: number; status?: string }>(ctx.request);
  const mood = clamp(Number(body.mood ?? 3), 1, 5);
  const energy = clamp(Number(body.energy ?? 3), 1, 5);
  const status = body.status ?? 'focus';
  ensure(['focus', 'solo', 'pair', 'afk'].includes(status), 400, 'Invalid status');
  const id = crypto.randomUUID();
  const createdAt = nowMs();
  await run(
    ctx.env.DB,
    'INSERT INTO checkins (id, user_id, room_id, mood, energy, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, ctx.user!.id, resolvedRoomId, mood, energy, status, createdAt]
  );
  await run(
    ctx.env.DB,
    'INSERT INTO presence (user_id, room_id, status, mood, energy, updated_at) VALUES (?, ?, ?, ?, ?, ?) '
      + 'ON CONFLICT(user_id, room_id) DO UPDATE SET status=excluded.status, mood=excluded.mood, energy=excluded.energy, updated_at=excluded.updated_at',
    [ctx.user!.id, resolvedRoomId, status, mood, energy, createdAt]
  );
  ctx.waitUntil(computeSuggestions(ctx.env, resolvedRoomId));
  return jsonResponse({ ok: true });
}

export async function handleGetCheckins(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const url = new URL(ctx.request.url);
  const sinceMs = Number(url.searchParams.get('since') ?? 0);
  const windowStart = sinceMs || nowMs() - 30 * 60 * 1000;
  const checkins = await all<{
    id: string;
    user_id: string;
    email?: string | null;
    mood: number;
    energy: number;
    status: string;
    created_at: number;
  }>(
    ctx.env.DB,
    `SELECT c.id, c.user_id, u.email, c.mood, c.energy, c.status, c.created_at
     FROM checkins c
     JOIN users u ON u.id = c.user_id
     WHERE c.room_id = ? AND c.created_at >= ?
     ORDER BY c.created_at DESC`,
    [resolvedRoomId, windowStart]
  );
  return jsonResponse({ checkins });
}

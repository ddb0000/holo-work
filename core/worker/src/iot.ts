import { HandlerContext } from './types';
import { readJson, jsonResponse, ensure, nowMs, sha256Hex, clamp } from './utils';
import { all, first, run } from './db';
import { computeSuggestions } from './agent';
import { requireRoomMembership } from './access';

export async function handleCreateDevice(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');
  const body = await readJson<{ room_id?: string; name?: string; kind?: string }>(ctx.request);
  const roomKey = body.room_id?.trim();
  const name = body.name?.trim() ?? 'Env Beacon';
  ensure(roomKey, 400, 'room_id required');
  const room = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomKey, roomKey]);
  ensure(room, 404, 'Room not found');
  const deviceId = `device_${crypto.randomUUID().split('-')[0]}`;
  const secretPlain = generateSecret();
  const secretHash = await hashDeviceSecret(secretPlain, ctx.env.PEPPER);
  await run(
    ctx.env.DB,
    'INSERT INTO devices (id, room_id, name, kind, secret_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [deviceId, room!.id, name, body.kind ?? 'environment', secretHash, nowMs()]
  );
  return jsonResponse({ device: { id: deviceId, room_id: room!.id, name, kind: body.kind ?? 'environment' }, secret: secretPlain }, { status: 201 });
}

export async function handleListDevices(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');
  const devices = await all<{ id: string; room_id: string; name: string; kind: string; created_at: number }>(
    ctx.env.DB,
    'SELECT id, room_id, name, kind, created_at FROM devices ORDER BY created_at DESC'
  );
  return jsonResponse({ devices });
}

export async function handleIngest(ctx: HandlerContext): Promise<Response> {
  const secret = ctx.request.headers.get('x-device-secret');
  ensure(secret, 401, 'Missing X-Device-Secret');
  const body = await readJson<{ device_id?: string; t_c?: number; noise_db?: number; lux?: number; ts?: number }>(ctx.request);
  const deviceId = body.device_id?.trim();
  ensure(deviceId, 400, 'device_id required');
  const device = await first<{ id: string; room_id: string; secret_hash: string }>(
    ctx.env.DB,
    'SELECT id, room_id, secret_hash FROM devices WHERE id = ?',
    [deviceId]
  );
  ensure(device, 404, 'Device not found');
  const hashed = await hashDeviceSecret(secret!, ctx.env.PEPPER);
  ensure(hashed === device!.secret_hash, 401, 'Invalid device secret');
  const createdAt = Number(body.ts) || nowMs();
  const tC = body.t_c ?? null;
  const noise = body.noise_db ?? null;
  const lux = body.lux ?? null;
  await run(
    ctx.env.DB,
    'INSERT INTO readings (id, device_id, room_id, t_c, noise_db, lux, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [crypto.randomUUID(), device!.id, device!.room_id, tC, noise, lux, createdAt]
  );
  await run(ctx.env.DB, 'DELETE FROM readings WHERE room_id = ? AND created_at < ?', [device!.room_id, nowMs() - 15 * 60 * 1000]);
  ctx.waitUntil(computeSuggestions(ctx.env, device!.room_id));
  return jsonResponse({ stored: true });
}

export async function handleGetReadings(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const url = new URL(ctx.request.url);
  const minutes = clamp(Number(url.searchParams.get('window') ?? '15'), 5, 60);
  const windowStart = nowMs() - minutes * 60 * 1000;
  const readings = await all<{
    id: string;
    device_id: string;
    t_c: number;
    noise_db: number;
    lux: number;
    created_at: number;
  }>(
    ctx.env.DB,
    'SELECT id, device_id, t_c, noise_db, lux, created_at FROM readings WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 200',
    [resolvedRoomId, windowStart]
  );
  const ordered = readings.reverse();
  const summary = summarizeReadings(ordered);
  return jsonResponse({ readings: ordered, summary });
}

export function summarizeReadings(readings: Array<{ t_c: number; noise_db: number; lux: number }>) {
  if (!readings.length) return null;
  const sums = readings.reduce(
    (acc, row) => {
      if (typeof row.t_c === 'number') {
        acc.t_c.count += 1;
        acc.t_c.sum += row.t_c;
      }
      if (typeof row.noise_db === 'number') {
        acc.noise.count += 1;
        acc.noise.sum += row.noise_db;
      }
      if (typeof row.lux === 'number') {
        acc.lux.count += 1;
        acc.lux.sum += row.lux;
      }
      return acc;
    },
    {
      t_c: { sum: 0, count: 0 },
      noise: { sum: 0, count: 0 },
      lux: { sum: 0, count: 0 },
    }
  );
  const avg = (sum: number, count: number) => (count ? Number((sum / count).toFixed(1)) : null);
  return {
    avg_t_c: avg(sums.t_c.sum, sums.t_c.count),
    avg_noise_db: avg(sums.noise.sum, sums.noise.count),
    avg_lux: avg(sums.lux.sum, sums.lux.count),
  };
}

function generateSecret(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hashDeviceSecret(secret: string, pepper: string): Promise<string> {
  return sha256Hex(`${secret}${pepper}`);
}

import { HandlerContext, Env } from './types';
import { all, first, run } from './db';
import { jsonResponse, ensure, nowMs } from './utils';
import { requireRoomMembership } from './access';

const READING_WINDOW_MS = 15 * 60 * 1000;
const CHECKIN_WINDOW_MS = 30 * 60 * 1000;
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

interface ReadingRow {
  t_c: number | null;
  noise_db: number | null;
  lux: number | null;
  created_at: number;
}

interface CheckinRow {
  user_id: string;
  mood: number | null;
  energy: number | null;
  status: string | null;
  created_at: number;
}

export async function computeSuggestions(env: Env, roomId: string): Promise<void> {
  const now = nowMs();
  const readings = await all<ReadingRow>(
    env.DB,
    'SELECT t_c, noise_db, lux, created_at FROM readings WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 50',
    [roomId, now - READING_WINDOW_MS]
  );
  if (!readings.length) {
    return;
  }
  const checkins = await all<CheckinRow>(
    env.DB,
    'SELECT user_id, mood, energy, status, created_at FROM checkins WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC',
    [roomId, now - CHECKIN_WINDOW_MS]
  );
  const candidates = buildCandidates(readings, checkins);
  for (const suggestion of candidates) {
    const exists = await first<{ id: string }>(
      env.DB,
      'SELECT id FROM suggestions WHERE room_id = ? AND kind = ? AND created_at >= ? LIMIT 1',
      [roomId, suggestion.kind, now - DEDUPE_WINDOW_MS]
    );
    if (exists) continue;
    await run(
      env.DB,
      'INSERT INTO suggestions (id, room_id, user_id, kind, text, created_at) VALUES (?, ?, NULL, ?, ?, ?)',
      [crypto.randomUUID(), roomId, suggestion.kind, suggestion.text, now]
    );
  }
  await run(env.DB, 'DELETE FROM suggestions WHERE created_at < ?', [now - 6 * 60 * 60 * 1000]);
}

export function buildCandidates(readings: ReadingRow[], checkins: CheckinRow[]) {
  const latest = readings[0];
  const lowEnergy = checkins.filter((c) => typeof c.energy === 'number' && c.energy! <= 2);
  const lowMood = checkins.filter((c) => typeof c.mood === 'number' && c.mood! <= 2);
  const focusCount = checkins.filter((c) => c.status === 'focus').length;
  const candidates: Array<{ kind: string; text: string }> = [];

  if (typeof latest.noise_db === 'number' && latest.noise_db > 65 && lowEnergy.length) {
    candidates.push({
      kind: 'move',
      text: `Ruído elevado (~${latest.noise_db.toFixed(0)} dB). Liberar sala alternativa ou oferecer fones.`,
    });
  }

  if (typeof latest.t_c === 'number' && latest.t_c > 27 && lowMood.length) {
    candidates.push({
      kind: 'pause',
      text: `Temperatura em ${latest.t_c.toFixed(1)}°C com humor baixo. Propor pausa rápida + hidratação.`,
    });
  }

  if (typeof latest.lux === 'number' && latest.lux < 200) {
    candidates.push({
      kind: 'environment',
      text: `Luminosidade baixa (${latest.lux.toFixed(0)} lux). Ajustar luz ou mover para área mais iluminada.`,
    });
  }

  if (focusCount >= 2 && readings.length && (!lowMood.length || !lowEnergy.length)) {
    candidates.push({
      kind: 'pair',
      text: 'Há várias pessoas em foco por 30+ min. Sugerir pairing rápido para desbloquear tarefas críticas.',
    });
  }

  return candidates;
}

export async function handleGetSuggestions(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const suggestions = await all<{ id: string; kind: string; text: string; created_at: number }>(
    ctx.env.DB,
    'SELECT id, kind, text, created_at FROM suggestions WHERE room_id = ? ORDER BY created_at DESC LIMIT 20',
    [resolvedRoomId]
  );
  return jsonResponse({ suggestions });
}

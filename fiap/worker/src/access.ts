import { Env } from './types';
import { ensure } from './utils';
import { first } from './db';

export async function requireRoomMembership(env: Env, roomKey: string, userId: string): Promise<string> {
  const room = await first<{ id: string }>(env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomKey, roomKey]);
  ensure(room, 404, 'Room not found');
  const member = await first<{ user_id: string }>(
    env.DB,
    'SELECT user_id FROM room_members WHERE room_id = ? AND user_id = ?',
    [room!.id, userId]
  );
  ensure(member, 403, 'Join room first');
  return room!.id;
}

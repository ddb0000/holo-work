PRAGMA foreign_keys = OFF;

DELETE FROM users;
DELETE FROM rooms;
DELETE FROM room_members;
DELETE FROM messages;
DELETE FROM tasks;
DELETE FROM checkins;
DELETE FROM devices;
DELETE FROM readings;
DELETE FROM suggestions;
DELETE FROM events;
DELETE FROM anon_users;
DELETE FROM presence;
DELETE FROM rl_window;

INSERT INTO users (id, email, pass_hash, role, created_at)
VALUES ('user-admin', 'admin@holo.work', 'pbkdf2$200000$kutwS1jQDWsYX0xQex7HSQ==$eMuaYN6F3q9ZAUVDt4U2JBDD7SxXkgkVlrJ12jFckO0=', 'admin', strftime('%s','now')*1000);

INSERT INTO rooms (id, name, slug, map_seed, created_at)
VALUES
  ('room-holo', 'Holo Hub', 'holo-hub', 'grid:16x16:hub', strftime('%s','now')*1000),
  ('room-lab', 'Lab Norte', 'lab-norte', 'grid:16x16:lab', strftime('%s','now')*1000);

INSERT INTO room_members (user_id, room_id, joined_at) VALUES
  ('user-admin', 'room-holo', strftime('%s','now')*1000),
  ('user-admin', 'room-lab', strftime('%s','now')*1000);

INSERT INTO devices (id, room_id, name, kind, secret_hash, created_at)
VALUES ('device-holo-01', 'room-holo', 'Env Beacon 01', 'environment', '92ae2a030fb7b169cf2612db1e8a4819fb03b9356f714be39c2a4ffe2d127f71', strftime('%s','now')*1000);

-- Optional: the Worker creates these tables by itself on first use.
-- Run manually with:  npx wrangler d1 execute yonezu-ghost --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT NOT NULL, at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS requests (id TEXT PRIMARY KEY, at TEXT NOT NULL, body TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new');
CREATE INDEX IF NOT EXISTS requests_at ON requests (at);
CREATE TABLE IF NOT EXISTS rl (k TEXT PRIMARY KEY, n INTEGER NOT NULL, reset INTEGER NOT NULL);

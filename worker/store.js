// Data store: Cloudflare D1 (SQLite). Tables are created on first use.
// Without a D1 binding the site is read-only and serves the bundled public/seed.js.
const SCHEMA = [
  'CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT NOT NULL, at INTEGER NOT NULL)',
  'CREATE TABLE IF NOT EXISTS requests (id TEXT PRIMARY KEY, at TEXT NOT NULL, body TEXT NOT NULL, status TEXT NOT NULL DEFAULT \'new\')',
  'CREATE INDEX IF NOT EXISTS requests_at ON requests (at)',
  'CREATE TABLE IF NOT EXISTS rl (k TEXT PRIMARY KEY, n INTEGER NOT NULL, reset INTEGER NOT NULL)',
];

let ready = null;
export const hasStore = env => !!env.DB;
export async function db(env) {
  if (!env.DB) return null;
  if (!ready) ready = env.DB.batch(SCHEMA.map(q => env.DB.prepare(q))).catch(e => { ready = null; throw e; });
  await ready;
  return env.DB;
}

const KEY = env => env.DATA_KEY || 'yonezu:data';

async function seed(env, origin) {
  const r = await env.ASSETS.fetch(new Request(origin + '/seed.js'));
  const src = await r.text();
  return JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
}

let memo = null; // short in-isolate cache so bursts of page views don't each hit the database
export async function load(env, origin, opts = {}) {
  if (memo && !opts.fresh && Date.now() - memo.at < 10000) return memo.data;
  try {
    const data = await loadRaw(env, origin);
    memo = { at: Date.now(), data };
    return data;
  } catch (e) {
    // database unavailable or over its daily quota: stay readable with the last copy we have
    if (opts.fresh) throw e;
    if (memo) return memo.data;
    return seed(env, origin);
  }
}
async function loadRaw(env, origin) {
  const d = await db(env);
  if (d) {
    const v = await d.prepare('SELECT v FROM kv WHERE k = ?').bind(KEY(env)).first('v');
    if (v) return JSON.parse(v);
  }
  return seed(env, origin);
}

export async function save(env, data) {
  const d = await db(env);
  if (!d) { const e = new Error('storage not configured'); e.code = 'no_store'; throw e; }
  const k = KEY(env), now = Date.now();
  await d.batch([
    // one-step backup of the previous version under KEY:prev
    d.prepare('INSERT INTO kv (k, v, at) SELECT ?1, v, at FROM kv WHERE k = ?2 ON CONFLICT(k) DO UPDATE SET v = excluded.v, at = excluded.at').bind(k + ':prev', k),
    d.prepare('INSERT INTO kv (k, v, at) VALUES (?1, ?2, ?3) ON CONFLICT(k) DO UPDATE SET v = excluded.v, at = excluded.at').bind(k, JSON.stringify(data), now),
  ]);
  memo = { at: now, data };
}

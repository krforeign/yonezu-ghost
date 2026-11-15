// Fixed-window counters in D1 (shared by every Worker instance); in-memory fallback without D1.
import { db } from './store.js';

const mem = new Map();
const PREFIX = 'yonezu:rl:';

// Record one event; returns the count in the current window.
export async function hit(env, key, windowSec) {
  const d = await db(env);
  const k = PREFIX + key, now = Date.now(), reset = now + windowSec * 1000;
  if (d) {
    if (Math.random() < 0.02) await d.prepare('DELETE FROM rl WHERE reset < ?').bind(now).run();
    return await d.prepare(
      'INSERT INTO rl (k, n, reset) VALUES (?1, 1, ?2) ON CONFLICT(k) DO UPDATE SET ' +
      'n = CASE WHEN rl.reset < ?3 THEN 1 ELSE rl.n + 1 END, reset = CASE WHEN rl.reset < ?3 THEN ?2 ELSE rl.reset END RETURNING n'
    ).bind(k, reset, now).first('n');
  }
  let e = mem.get(k);
  if (!e || e.reset < now) { e = { n: 0, reset }; mem.set(k, e); }
  e.n++;
  if (mem.size > 5000) for (const [kk, v] of mem) if (v.reset < now) mem.delete(kk);
  return e.n;
}

// Is `key` already at or over `limit` in the current window?
export async function over(env, key, limit) {
  const d = await db(env);
  const k = PREFIX + key, now = Date.now();
  if (d) return (Number(await d.prepare('SELECT n FROM rl WHERE k = ? AND reset >= ?').bind(k, now).first('n')) || 0) >= limit;
  const e = mem.get(k);
  return !!e && e.reset >= now && e.n >= limit;
}

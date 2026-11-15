// API routes. Each returns a Response (or throws HttpError).
import { json, readJson, clientIp, sleep, HttpError } from './util.js';
import { load, save, hasStore, db } from './store.js';
import { issue, verify, checkPassword, isAdmin, bearer } from './auth.js';
import { hit, over } from './ratelimit.js';

const unauthorized = () => json({ error: 'unauthorized', code: 'auth' }, 401);
const notAllowed = allow => json({ error: 'method not allowed' }, 405, { Allow: allow });

/* ---- GET /api/data (public, briefly cached)  ·  PUT /api/data (admin) ---- */
const MAX_BYTES = 900 * 1024;
const cacheKey = origin => new Request(origin + '/api/data?__edge=1');

export async function data(request, env, ctx, url) {
  if (request.method === 'GET') {
    // ?fresh=1 skips the caches, but only for the logged-in owner (otherwise anyone could use it to flood the database)
    const fresh = url.searchParams.has('fresh') && !!(await verify(env, bearer(request)));
    const edge = typeof caches !== 'undefined' ? caches.default : null;
    if (!fresh && edge) { const hitRes = await edge.match(cacheKey(url.origin)); if (hitRes) return hitRes; }
    const d = await load(env, url.origin, { fresh });
    const res = json(Object.assign({}, d, { storage: hasStore(env) }), 200, { 'Cache-Control': fresh ? 'no-store' : 'public, max-age=20' });
    if (!fresh && edge) ctx.waitUntil(edge.put(cacheKey(url.origin), res.clone()).catch(() => {}));
    return res;
  }
  if (request.method === 'PUT') {
    if (!(await isAdmin(env, request))) return unauthorized();
    const b = await readJson(request);
    if (!Array.isArray(b.songs)) return json({ error: 'songs must be an array', code: 'bad_request' }, 400);
    if (!hasStore(env)) return json({ error: 'storage not configured', code: 'no_store' }, 501);
    const cur = await load(env, url.origin, { fresh: true });
    if (b.base && cur.updated && b.base !== cur.updated) {
      return json({ error: 'a newer version was saved', code: 'conflict', updated: cur.updated }, 409);
    }
    const out = { v: 2, updated: new Date().toISOString(), songs: b.songs, cheers: Array.isArray(b.cheers) ? b.cheers : [] };
    if (new TextEncoder().encode(JSON.stringify(out)).length > MAX_BYTES) return json({ error: 'data too large', code: 'too_large' }, 413);
    await save(env, out);
    if (typeof caches !== 'undefined') ctx.waitUntil(caches.default.delete(cacheKey(url.origin)).catch(() => {}));
    return json({ ok: true, data: out });
  }
  return notAllowed('GET, PUT');
}

/* ---- POST /api/login {password} -> {token, exp} ---- */
// Brute-force guard: 8 attempts per IP per 15 min, 60 wrong passwords per hour from everyone.
const IP_LIMIT = 8, IP_WINDOW = 900, ALL_LIMIT = 60, ALL_WINDOW = 3600;
export async function login(request, env) {
  if (request.method !== 'POST') return notAllowed('POST');
  if (!env.ADMIN_PASSWORD) return json({ error: 'ADMIN_PASSWORD is not set', code: 'no_password' }, 501);
  try {
    const n = await hit(env, 'login:ip:' + clientIp(request), IP_WINDOW);
    if (n > IP_LIMIT || await over(env, 'login:all', ALL_LIMIT)) {
      return json({ error: 'too many attempts', code: 'rate' }, 429, { 'Retry-After': String(IP_WINDOW) });
    }
  } catch (e) { /* limiter unavailable: fall through to the slow path below */ }
  const b = await readJson(request, 4096);
  if (!(await checkPassword(env, String(b.password || '').slice(0, 200)))) {
    try { await hit(env, 'login:all', ALL_WINDOW); } catch (e) {}
    await sleep(800); // slow down guessing (waiting costs no CPU time on Workers)
    return json({ error: 'wrong password', code: 'auth' }, 401);
  }
  return json(await issue(env));
}

/* ---- /api/translate: POST {lines, title?} -> {lines}  ·  GET -> DeepL usage (admin) ---- */
const deeplHost = key => (key.trim().endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com');
async function deepl(key, path, body) {
  const r = await fetch(deeplHost(key) + path, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: 'DeepL-Auth-Key ' + key.trim(), 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.status === 456) throw new HttpError(429, 'quota', 'DeepL quota exceeded');
  if (r.status === 403) throw new HttpError(502, 'bad_key', 'DeepL rejected the API key');
  if (r.status === 429) throw new HttpError(429, 'busy', 'DeepL is rate limiting, try again shortly');
  if (!r.ok) throw new HttpError(502, 'deepl', 'DeepL error ' + r.status);
  return r.json();
}
export async function translate(request, env) {
  if (!(await isAdmin(env, request))) return unauthorized();
  const key = env.DEEPL_API_KEY;
  if (!key) return json({ error: 'DEEPL_API_KEY is not set', code: 'no_key' }, 501);
  if (request.method === 'GET') return json(await deepl(key, '/v2/usage'));
  if (request.method !== 'POST') return notAllowed('GET, POST');
  const { lines, title } = await readJson(request);
  if (!Array.isArray(lines) || !lines.length) return json({ error: 'lines required', code: 'bad_request' }, 400);
  if (lines.length > 400) return json({ error: 'too many lines', code: 'too_large' }, 413);
  if (lines.reduce((n, x) => n + String(x == null ? '' : x).length, 0) > 30000) return json({ error: 'text too long', code: 'too_large' }, 413);
  const out = [];
  for (let i = 0; i < lines.length; i += 50) { // DeepL accepts up to 50 texts per request
    const text = lines.slice(i, i + 50).map(x => String(x == null ? '' : x) || ' ');
    const body = { text, source_lang: 'JA', target_lang: 'KO', preserve_formatting: true };
    if (title) body.context = `Lines of the song "${String(title).slice(0, 80)}" by the Japanese singer-songwriter Kenshi Yonezu (米津玄師). Translate each line on its own, naturally.`;
    const j = await deepl(key, '/v2/translate', body);
    (j.translations || []).forEach(t => out.push(t.text));
  }
  return json({ lines: out });
}

/* ---- GET /api/lrclib?title=&artist= (or ?q=) -> {results} (admin) ---- */
async function lrcSearch(env, params) {
  const u = new URL('https://lrclib.net/api/search');
  Object.entries(params).forEach(([k, v]) => { if (v) u.searchParams.set(k, v); });
  const UA = env.LRCLIB_USER_AGENT || 'yonezu-ghost-fanpage/1.0 (call guide editor)';
  let r;
  for (let i = 0; i < 2; i++) { // one retry: LRCLIB sometimes answers 503 under load
    r = await fetch(u, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
    if (r.ok || !(r.status >= 500 || r.status === 429) || i === 1) break;
    await sleep(800);
  }
  if (!r.ok) throw new HttpError(502, 'lrclib', 'LRCLIB error ' + r.status);
  const j = await r.json();
  return Array.isArray(j) ? j : [];
}
export async function lrclib(request, env, ctx, url) {
  if (request.method !== 'GET') return notAllowed('GET');
  if (!(await isAdmin(env, request))) return unauthorized();
  const q = url.searchParams;
  const title = String(q.get('title') || '').trim().slice(0, 120);
  const artist = String(q.get('artist') || '').trim().slice(0, 80);
  const free = String(q.get('q') || '').trim().slice(0, 200);
  if (!title && !free) return json({ error: 'title or q required', code: 'bad_request' }, 400);
  let list = [];
  if (title) list = await lrcSearch(env, { track_name: title, artist_name: artist });
  if (!list.length) list = await lrcSearch(env, { q: free || [artist, title].filter(Boolean).join(' ') });
  const norm = s => String(s || '').toLowerCase();
  list.sort((a, b) => (!!b.syncedLyrics - !!a.syncedLyrics) || ((norm(b.artistName) === norm(artist)) - (norm(a.artistName) === norm(artist))));
  return json({ results: list.slice(0, 12).map(x => ({
    id: x.id, trackName: x.trackName, artistName: x.artistName, albumName: x.albumName,
    duration: x.duration, instrumental: !!x.instrumental,
    syncedLyrics: x.syncedLyrics || '', plainLyrics: x.plainLyrics || '',
  })) });
}

/* ---- /api/requests: visitors' requests (POST anyone · GET/PATCH/DELETE admin) ----
   Safety: honeypot + minimum fill time, per-IP and site-wide daily caps, field whitelist and length
   limits, list capped at MAX items, 30-day expiry, IP never stored. */
const MAX = 500, TTL_DAYS = 30, REQ_IP_LIMIT = 10, REQ_ALL_LIMIT = 300, DAY = 86400;
const TYPES = new Set(['call', 'info', 'feature', 'other']);
const str = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, n);
function clean(b) {
  const type = TYPES.has(b.type) ? b.type : 'other';
  const out = { type, body: str(b.body, 500), lang: b.lang === 'ko' ? 'ko' : 'ja' };
  if (type === 'call') {
    const song = str(b.song, 40);
    if (/^[\w-]+$/.test(song)) out.song = song;
    out.songTitle = str(b.songTitle, 80);
    if (Number.isInteger(b.line) && b.line >= 0 && b.line < 1000) out.line = b.line;
    out.lineText = str(b.lineText, 120);
    out.cheer = /^[\w-]{1,24}$/.test(String(b.cheer || '')) ? String(b.cheer) : '';
    out.text = str(b.text, 60);
    const tm = Number(b.t);
    if (isFinite(tm) && tm >= 0 && tm < 3600) out.t = Math.round(tm * 10) / 10;
  }
  return out;
}
const newId = () => [...crypto.getRandomValues(new Uint8Array(6))].map(x => x.toString(16).padStart(2, '0')).join('');

export async function requests(request, env, ctx, url) {
  const d = await db(env);
  if (!d) return json({ error: 'storage not configured', code: 'no_store' }, 501);

  if (request.method === 'POST') {
    const b = await readJson(request, 16 * 1024);
    // bots: hidden field filled, or the form was sent faster than a person can
    if (b.website || !(Number(b.elapsed) >= 2500)) return json({ ok: true });
    const item = clean(b);
    if (item.type !== 'call' && item.body.length < 2) return json({ error: 'empty', code: 'empty' }, 400);
    if (item.type === 'call' && !item.body && !item.cheer && !item.text) return json({ error: 'empty', code: 'empty' }, 400);
    const n = await hit(env, 'req:ip:' + clientIp(request), DAY);
    if (n > REQ_IP_LIMIT || await over(env, 'req:all', REQ_ALL_LIMIT)) return json({ error: 'too many requests', code: 'rate' }, 429);
    await hit(env, 'req:all', DAY);
    item.id = newId();
    item.at = new Date().toISOString();
    await d.batch([
      d.prepare('INSERT INTO requests (id, at, body, status) VALUES (?, ?, ?, ?)').bind(item.id, item.at, JSON.stringify(item), 'new'),
      d.prepare('DELETE FROM requests WHERE id NOT IN (SELECT id FROM requests ORDER BY at DESC LIMIT ?)').bind(MAX),
    ]);
    return json({ ok: true });
  }

  if (!(await isAdmin(env, request))) return unauthorized();
  await d.prepare('DELETE FROM requests WHERE at < ?').bind(new Date(Date.now() - TTL_DAYS * DAY * 1000).toISOString()).run();

  if (request.method === 'GET') {
    const { results } = await d.prepare('SELECT body, status FROM requests ORDER BY at DESC LIMIT ?').bind(MAX).all();
    const items = [];
    for (const r of results || []) { try { items.push(Object.assign(JSON.parse(r.body), { status: r.status || 'new' })); } catch (e) {} }
    return json({ items });
  }
  if (request.method === 'PATCH') {
    const { id, status } = await readJson(request, 4096);
    if (!['new', 'hold', 'done'].includes(status)) return json({ error: 'bad request', code: 'bad_request' }, 400);
    const r = await d.prepare('UPDATE requests SET status = ? WHERE id = ?').bind(status, String(id || '')).run();
    if (!r.meta || !r.meta.changes) return json({ error: 'bad request', code: 'bad_request' }, 400);
    return json({ ok: true });
  }
  if (request.method === 'DELETE') {
    const r = await d.prepare('DELETE FROM requests WHERE id = ?').bind(String(url.searchParams.get('id') || '')).run();
    if (!r.meta || !r.meta.changes) return json({ error: 'not found', code: 'not_found' }, 404);
    return json({ ok: true });
  }
  return notAllowed('GET, POST, PATCH, DELETE');
}

// Small helpers shared by the API routes.
const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
};

export function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, headers),
  });
}

// Security headers on every API response (the _headers file only covers static files).
export function secure(res) {
  const r = new Response(res.body, res);
  for (const [k, v] of Object.entries(SECURITY)) if (!r.headers.has(k)) r.headers.set(k, v);
  return r;
}

export class HttpError extends Error {
  constructor(status, code, message) { super(message || code); this.status = status; this.code = code; }
}

// JSON body with a size cap (bytes).
export async function readJson(request, max = 1200 * 1024) {
  const len = Number(request.headers.get('content-length') || 0);
  if (len > max) throw new HttpError(413, 'too_large', 'body too large');
  const txt = await request.text();
  if (txt.length > max) throw new HttpError(413, 'too_large', 'body too large');
  if (!txt) return {};
  try { return JSON.parse(txt); } catch (e) { throw new HttpError(400, 'bad_request', 'invalid JSON'); }
}

export const clientIp = request =>
  String(request.headers.get('CF-Connecting-IP') || 'unknown').slice(0, 64).replace(/[^0-9a-fA-F:.]/g, '') || 'unknown';

export const sleep = ms => new Promise(r => setTimeout(r, ms));

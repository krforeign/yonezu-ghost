// Admin auth: one password (ADMIN_PASSWORD secret) -> signed, expiring token (HMAC-SHA256, Web Crypto).
const enc = new TextEncoder();
const TOKEN_DAYS = 30;

const b64u = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));

const hmacKey = env => crypto.subtle.importKey(
  'raw', enc.encode(env.AUTH_SECRET || ('yonezu:' + (env.ADMIN_PASSWORD || ''))),
  { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

export async function issue(env) {
  const exp = Date.now() + TOKEN_DAYS * 864e5;
  const p = b64u(enc.encode(JSON.stringify({ role: 'admin', exp })));
  const s = b64u(await crypto.subtle.sign('HMAC', await hmacKey(env), enc.encode(p)));
  return { token: p + '.' + s, exp };
}

export async function verify(env, token) {
  if (!token || !env.ADMIN_PASSWORD) return null;
  const [p, s] = String(token).split('.');
  if (!p || !s) return null;
  try {
    // crypto.subtle.verify compares in constant time
    if (!(await crypto.subtle.verify('HMAC', await hmacKey(env), unb64u(s), enc.encode(p)))) return null;
    const data = JSON.parse(new TextDecoder().decode(unb64u(p)));
    return data.exp && data.exp >= Date.now() ? data : null;
  } catch (e) { return null; }
}

export async function checkPassword(env, pw) {
  const real = env.ADMIN_PASSWORD || '';
  if (!real) return false;
  const [a, b] = await Promise.all([pw, real].map(x => crypto.subtle.digest('SHA-256', enc.encode(String(x || '')))));
  const x = new Uint8Array(a), y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export function bearer(request) {
  const h = request.headers.get('Authorization') || '';
  return h.startsWith('Bearer ') ? h.slice(7) : '';
}
export const isAdmin = (env, request) => verify(env, bearer(request));

// 米津玄師 GHOST fan page — Cloudflare Worker.
// Static files (public/) are served by Workers Static Assets; only /api/* reaches this code
// (see run_worker_first in wrangler.jsonc). Storage: D1 (binding DB). Secrets: ADMIN_PASSWORD, DEEPL_API_KEY.
import { json, secure, HttpError } from './util.js';
import * as routes from './routes.js';

const ROUTES = { data: routes.data, login: routes.login, translate: routes.translate, lrclib: routes.lrclib, requests: routes.requests };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    const handler = ROUTES[url.pathname.slice(5).replace(/\/$/, '')];
    let res;
    try {
      res = handler ? await handler(request, env, ctx, url) : json({ error: 'not found', code: 'not_found' }, 404);
    } catch (e) {
      res = e instanceof HttpError
        ? json({ error: e.message, code: e.code }, e.status)
        : json({ error: String((e && e.message) || e), code: e && e.code === 'no_store' ? 'no_store' : 'server' }, e && e.code === 'no_store' ? 501 : 500);
    }
    return secure(res);
  },
};

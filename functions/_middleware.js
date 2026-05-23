import { SESSION_COOKIE_NAME, err, getCookie, verifySession } from './_utils.js';

// 認証ゲート。
// 保護対象: /api/*（ただし /api/login と /api/public-posts は公開）
// 管理ページ /admin/ の表示自体はクライアント側で /api/me を見てログイン画面を出すため、
// HTML はゲートしない（API だけ守れば十分）。
export const onRequest = async (ctx) => {
  const url = new URL(ctx.request.url);
  const path = url.pathname;

  const isApi = path.startsWith('/api/');
  if (!isApi) return ctx.next();

  const isPublicApi = path === '/api/login' || path === '/api/public-posts';
  if (isPublicApi) return ctx.next();

  const token = getCookie(ctx.request, SESSION_COOKIE_NAME);
  const ok = await verifySession(ctx.env.SESSION_SECRET, token);
  if (!ok) return err(401, 'unauthorized');
  return ctx.next();
};

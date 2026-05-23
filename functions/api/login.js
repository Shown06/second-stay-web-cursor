import {
  SESSION_TTL_SEC,
  buildSessionCookie,
  err,
  json,
  signSession,
  verifyPassword,
} from '../_utils.js';

// POST /api/login  { password }
export const onRequestPost = async (ctx) => {
  let body;
  try {
    body = await ctx.request.json();
  } catch {
    return err(400, 'invalid body');
  }
  const password = String(body.password || '');
  if (!password) return err(400, 'password required');

  const ok = await verifyPassword(ctx.env, password);
  if (!ok) {
    // ブルートフォースを緩める
    await new Promise((r) => setTimeout(r, 800));
    return err(401, 'invalid password');
  }

  const token = await signSession(ctx.env.SESSION_SECRET);
  return json(
    { ok: true },
    { headers: { 'Set-Cookie': buildSessionCookie(token, SESSION_TTL_SEC) } },
  );
};

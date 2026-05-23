import { err, json, updatePassword, verifyPassword } from '../_utils.js';

// POST /api/password  { current, next }
export const onRequestPost = async (ctx) => {
  let body;
  try {
    body = await ctx.request.json();
  } catch {
    return err(400, 'invalid body');
  }
  const current = String(body.current || '');
  const next = String(body.next || '');
  if (!current || !next) return err(400, 'current and next required');
  if (next.length < 8) return err(400, 'new password too short (min 8 chars)');
  const ok = await verifyPassword(ctx.env, current);
  if (!ok) return err(401, 'current password invalid');
  await updatePassword(ctx.env, next);
  return json({ ok: true });
};

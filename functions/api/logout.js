import { clearSessionCookie, json } from '../_utils.js';

// POST /api/logout
export const onRequestPost = async () => {
  return json({ ok: true }, { headers: { 'Set-Cookie': clearSessionCookie() } });
};

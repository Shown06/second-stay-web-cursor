import { json } from '../_utils.js';

// GET /api/me  — _middleware.js で認証済みなので true を返すだけ
export const onRequestGet = async () => {
  return json({ authenticated: true });
};

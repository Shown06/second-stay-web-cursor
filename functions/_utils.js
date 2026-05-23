// 共通ユーティリティ: セッション署名 / パスワード検証 / KV ヘルパー
// 中村ホームページ(hdc.works)の CMS バックエンドを SECOND STAY 向けに移植。
// env binding: SECOND_STAY_CMS (KVNamespace), ADMIN_PASSWORD_HASH, ADMIN_PASSWORD_SALT, SESSION_SECRET

const SESSION_TTL_DAYS = 30;
const SESSION_COOKIE = 'ss_session';

const enc = new TextEncoder();

function toHex(buf) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hex) {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = Number.parseInt(hex.substr(i * 2, 2), 16);
  return out;
}

export async function pbkdf2Hex(password, saltHex, iters = 100000, len = 32) {
  const salt = fromHex(saltHex);
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: iters, hash: 'SHA-256' },
    key,
    len * 8,
  );
  return toHex(bits);
}

function timingSafeEqualHex(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function verifyPassword(env, password) {
  // KV の cfg:password_* を優先（本人が変更可能）、なければ環境変数
  const dynHash = await env.SECOND_STAY_CMS.get('cfg:password_hash');
  const dynSalt = await env.SECOND_STAY_CMS.get('cfg:password_salt');
  const hash = dynHash || env.ADMIN_PASSWORD_HASH;
  const salt = dynSalt || env.ADMIN_PASSWORD_SALT;
  if (!hash || !salt) return false;
  const got = await pbkdf2Hex(password, salt);
  return timingSafeEqualHex(got, hash);
}

export async function updatePassword(env, newPassword) {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = toHex(saltBytes.buffer);
  const hashHex = await pbkdf2Hex(newPassword, saltHex);
  await env.SECOND_STAY_CMS.put('cfg:password_salt', saltHex);
  await env.SECOND_STAY_CMS.put('cfg:password_hash', hashHex);
}

async function hmacSha256(secret, data) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return toHex(sig);
}

export async function signSession(secret) {
  const ts = Date.now().toString();
  const sig = await hmacSha256(secret, ts);
  return `${ts}.${sig}`;
}

export async function verifySession(secret, token) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [ts, sig] = parts;
  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum)) return false;
  const ageMs = Date.now() - tsNum;
  if (ageMs < 0 || ageMs > SESSION_TTL_DAYS * 24 * 3600 * 1000) return false;
  const expected = await hmacSha256(secret, ts);
  return timingSafeEqualHex(expected, sig);
}

export function getCookie(request, name) {
  const raw = request.headers.get('Cookie') || '';
  const m = raw.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export function buildSessionCookie(value, maxAgeSec) {
  return [
    `${SESSION_COOKIE}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${maxAgeSec}`,
  ].join('; ');
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export const SESSION_TTL_SEC = SESSION_TTL_DAYS * 24 * 3600;
export const SESSION_COOKIE_NAME = SESSION_COOKIE;

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(init.headers || {}),
    },
  });
}

export function err(status, message) {
  return json({ error: message }, { status });
}

// ---- 記事(posts)の KV 読み書き ----
// index: "posts:index" = 新しい順の id 配列 / 各記事: "post:{id}"

export async function readIndex(env) {
  const raw = await env.SECOND_STAY_CMS.get('posts:index');
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeIndex(env, ids) {
  await env.SECOND_STAY_CMS.put('posts:index', JSON.stringify(ids));
}

export async function readPost(env, id) {
  const raw = await env.SECOND_STAY_CMS.get(`post:${id}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function writePost(env, post) {
  await env.SECOND_STAY_CMS.put(`post:${post.id}`, JSON.stringify(post));
}

export async function deletePost(env, id) {
  await env.SECOND_STAY_CMS.delete(`post:${id}`);
}

export function newId() {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${ts}-${rand}`;
}

export function sanitizeText(s, maxLen = 12000) {
  return String(s || '')
    .slice(0, maxLen)
    .replace(/\r\n/g, '\n');
}

// 画像(base64 data URL)の検証 + 上限（合計 8MB）
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export function normalizeImage(value) {
  if (typeof value !== 'string') return '';
  // アップロード画像（base64 data URL）
  if (value.startsWith('data:image/')) {
    return value.length > MAX_IMAGE_BYTES ? '' : value;
  }
  // 既存アセットの相対パス（シード記事用・同一オリジン）
  if (value.startsWith('/assets/')) return value;
  return '';
}

import {
  err,
  json,
  newId,
  normalizeImage,
  readIndex,
  readPost,
  sanitizeText,
  writeIndex,
  writePost,
} from '../_utils.js';

// GET  /api/posts  (admin) -> 全記事（下書き含む・新しい順）
// POST /api/posts  (admin) -> 新規作成

export const onRequestGet = async (ctx) => {
  const ids = await readIndex(ctx.env);
  const posts = [];
  for (const id of ids) {
    const p = await readPost(ctx.env, id);
    if (p) posts.push(p);
  }
  return json({ posts });
};

export const onRequestPost = async (ctx) => {
  let body;
  try {
    body = await ctx.request.json();
  } catch {
    return err(400, 'invalid body');
  }

  const title = sanitizeText(body.title || '', 200);
  const date = sanitizeText(body.date || '', 50);
  const text = sanitizeText(body.body || '', 12000);
  const image_url = normalizeImage(body.image_url);
  const published = body.published === true;

  if (!title || !date) return err(400, 'title and date required');

  const now = Date.now();
  const post = {
    id: newId(),
    title,
    date,
    body: text,
    image_url,
    published,
    createdAt: now,
    updatedAt: now,
  };

  await writePost(ctx.env, post);
  const idx = await readIndex(ctx.env);
  idx.unshift(post.id);
  await writeIndex(ctx.env, idx);

  return json({ ok: true, post });
};

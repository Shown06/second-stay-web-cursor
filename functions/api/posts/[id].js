import {
  deletePost,
  err,
  json,
  normalizeImage,
  readIndex,
  readPost,
  sanitizeText,
  writeIndex,
  writePost,
} from '../../_utils.js';

// DELETE /api/posts/:id
// PATCH  /api/posts/:id

export const onRequestDelete = async (ctx) => {
  const id = ctx.params.id;
  const existed = await readPost(ctx.env, id);
  if (!existed) return err(404, 'not found');
  await deletePost(ctx.env, id);
  const idx = await readIndex(ctx.env);
  await writeIndex(
    ctx.env,
    idx.filter((x) => x !== id),
  );
  return json({ ok: true });
};

export const onRequestPatch = async (ctx) => {
  const id = ctx.params.id;
  const existed = await readPost(ctx.env, id);
  if (!existed) return err(404, 'not found');

  let body;
  try {
    body = await ctx.request.json();
  } catch {
    return err(400, 'invalid body');
  }

  const patched = {
    ...existed,
    title: typeof body.title === 'string' ? sanitizeText(body.title, 200) : existed.title,
    date: typeof body.date === 'string' ? sanitizeText(body.date, 50) : existed.date,
    body: typeof body.body === 'string' ? sanitizeText(body.body, 12000) : existed.body,
    image_url: body.image_url !== undefined ? normalizeImage(body.image_url) : existed.image_url,
    published: typeof body.published === 'boolean' ? body.published : existed.published,
    updatedAt: Date.now(),
  };

  await writePost(ctx.env, patched);
  return json({ ok: true, post: patched });
};

import { readIndex, readPost } from '../_utils.js';

// GET /api/public-posts  — 公開（認証不要）。published=true のみ・新しい順。
export const onRequestGet = async (ctx) => {
  const ids = await readIndex(ctx.env);
  const posts = [];
  for (const id of ids) {
    const p = await readPost(ctx.env, id);
    if (p?.published) {
      posts.push({
        id: p.id,
        title: p.title,
        date: p.date,
        body: p.body,
        image_url: p.image_url || null,
      });
    }
  }
  // 日付降順（同日なら index 順=新しい順を維持）
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return new Response(JSON.stringify({ posts }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=30',
    },
  });
};

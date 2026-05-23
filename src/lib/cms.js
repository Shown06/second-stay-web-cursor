// 公開ブログ記事の取得（Cloudflare Pages Functions /api/public-posts）。
// 取得失敗時（プレーンな Vite dev など Functions が無い環境）は空配列を返し、
// 呼び出し側のダミーデータ・フォールバックに委ねる。

export async function fetchPosts() {
  try {
    const res = await fetch('/api/public-posts', { headers: { Accept: 'application/json' } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.posts) ? data.posts : [];
  } catch {
    return [];
  }
}

export async function fetchPostById(id) {
  const posts = await fetchPosts();
  return posts.find((p) => p.id === id) || null;
}

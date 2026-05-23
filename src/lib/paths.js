const base = import.meta.env.BASE_URL;

function joinBase(segment) {
  const s = segment.startsWith('/') ? segment.slice(1) : segment;
  return base + s;
}

/** マルチページ URL（末尾スラッシュ付き・GitHub Pages base 対応） */
export const paths = {
  home: () => base,
  homeSection: (hashId) => {
    const id = hashId.startsWith('#') ? hashId.slice(1) : hashId;
    return `${base}#${id}`;
  },
  facilities: () => joinBase('facilities/'),
  about: () => joinBase('about/'),
  blog: () => joinBase('blog/'),
  blogPost: (id) => joinBase(`blog/?id=${encodeURIComponent(id)}`),
  company: () => joinBase('company/'),
  access: () => joinBase('access/'),
  contact: () => joinBase('contact/'),
};

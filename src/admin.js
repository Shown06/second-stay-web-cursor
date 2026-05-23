import './styles/variables.css';
import './styles/admin.css';
import { paths } from './lib/paths.js';

const app = document.getElementById('admin-app');

// ============================================
// API ヘルパー（Cloudflare Pages Functions・同一オリジン）
// ============================================

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* no body */
  }
  return { ok: res.ok, status: res.status, data };
}

// ============================================
// INITIALIZATION
// ============================================

async function init() {
  const { ok } = await api('/api/me');
  if (ok) renderDashboard();
  else renderLogin();
}

// ============================================
// LOGIN（パスワードのみ）
// ============================================

function renderLogin() {
  app.innerHTML = `
    <div class="admin-login">
      <div class="admin-login-card">
        <div class="admin-login-header">
          <h1 class="admin-logo">SECOND STAY</h1>
          <p class="admin-login-subtitle">ブログ管理</p>
        </div>
        <form id="login-form" class="admin-login-form">
          <div class="admin-field">
            <label for="password">パスワード</label>
            <input type="password" id="password" required placeholder="パスワードを入力" autocomplete="current-password">
          </div>
          <div id="login-error" class="admin-error" style="display:none;"></div>
          <button type="submit" class="admin-btn-primary" id="login-btn">ログイン</button>
        </form>
      </div>
    </div>
  `;
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');

  btn.disabled = true;
  btn.textContent = 'ログイン中...';
  errorEl.style.display = 'none';

  const { ok } = await api('/api/login', { method: 'POST', body: JSON.stringify({ password }) });

  if (ok) {
    renderDashboard();
  } else {
    errorEl.textContent = 'パスワードが正しくありません。';
    errorEl.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'ログイン';
  }
}

// ============================================
// DASHBOARD
// ============================================

async function renderDashboard() {
  app.innerHTML = `
    <div class="admin-layout">
      <header class="admin-header">
        <div class="admin-header-inner">
          <a href="${paths.home()}" class="admin-logo-sm">SECOND STAY</a>
          <nav class="admin-nav">
            <button class="admin-btn-ghost" id="password-btn">パスワード変更</button>
            <button class="admin-btn-ghost" id="logout-btn">ログアウト</button>
          </nav>
        </div>
      </header>
      <main class="admin-main">
        <div class="admin-container">
          <div class="admin-toolbar">
            <h2 class="admin-title">ブログ記事の管理</h2>
            <button class="admin-btn-primary" id="new-post-btn">＋ 新規作成</button>
          </div>
          <div id="admin-content">
            <div class="admin-loading">読み込み中...</div>
          </div>
        </div>
      </main>
    </div>
  `;

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await api('/api/logout', { method: 'POST' });
    renderLogin();
  });
  document.getElementById('password-btn').addEventListener('click', renderPasswordForm);
  document.getElementById('new-post-btn').addEventListener('click', () => renderEditor(null));

  await loadPostList();
}

async function loadPostList() {
  const content = document.getElementById('admin-content');
  const { ok, data } = await api('/api/posts');

  if (!ok) {
    content.innerHTML = renderErrorBox('記事の取得に失敗しました。再読み込みしてください。');
    return;
  }

  const posts = data?.posts || [];

  if (posts.length === 0) {
    content.innerHTML = `
      <div class="admin-empty">
        <p>まだ記事がありません。「＋ 新規作成」から最初の記事を作成しましょう。</p>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr><th>タイトル</th><th>日付</th><th>状態</th><th>操作</th></tr>
        </thead>
        <tbody>
          ${posts
            .map(
              (post) => `
            <tr>
              <td class="admin-td-title">${escapeHtml(post.title)}</td>
              <td class="admin-td-date">${post.date || '—'}</td>
              <td>
                <span class="admin-badge ${post.published ? 'admin-badge-published' : 'admin-badge-draft'}">
                  ${post.published ? '公開' : '下書き'}
                </span>
              </td>
              <td class="admin-td-actions">
                <button class="admin-btn-sm admin-btn-edit" data-id="${post.id}">編集</button>
                <button class="admin-btn-sm admin-btn-delete" data-id="${post.id}">削除</button>
              </td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;

  content.querySelectorAll('.admin-btn-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const post = posts.find((p) => p.id === btn.dataset.id);
      if (post) renderEditor(post);
    });
  });

  content.querySelectorAll('.admin-btn-delete').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm('この記事を削除してもよろしいですか？')) return;
      const { ok } = await api(`/api/posts/${btn.dataset.id}`, { method: 'DELETE' });
      if (!ok) alert('削除に失敗しました。');
      else await loadPostList();
    });
  });
}

// ============================================
// EDITOR
// ============================================

function renderEditor(post) {
  const isEdit = !!post;
  const content = document.getElementById('admin-content');
  let imageData = post?.image_url || '';

  content.innerHTML = `
    <div class="admin-editor">
      <div class="admin-editor-header">
        <button class="admin-btn-ghost" id="back-to-list">← 一覧に戻る</button>
        <h3>${isEdit ? '記事を編集' : '新規記事作成'}</h3>
      </div>
      <form id="editor-form" class="admin-editor-form">
        <div class="admin-field">
          <label for="post-title">タイトル</label>
          <input type="text" id="post-title" required value="${escapeAttr(post?.title || '')}" placeholder="記事のタイトルを入力">
        </div>
        <div class="admin-field-row">
          <div class="admin-field">
            <label for="post-date">日付</label>
            <input type="date" id="post-date" required value="${post?.date || new Date().toISOString().split('T')[0]}">
          </div>
          <div class="admin-field">
            <label for="post-published">公開状態</label>
            <select id="post-published">
              <option value="false" ${!post?.published ? 'selected' : ''}>下書き</option>
              <option value="true" ${post?.published ? 'selected' : ''}>公開</option>
            </select>
          </div>
        </div>
        <div class="admin-field">
          <label>画像（任意）</label>
          <div class="admin-image-upload">
            ${imageData ? `<img src="${imageData}" class="admin-image-preview" id="image-preview">` : '<div class="admin-image-placeholder" id="image-preview">画像なし</div>'}
            <div class="admin-image-controls">
              <input type="file" id="post-image" accept="image/*" style="display:none;">
              <button type="button" class="admin-btn-sm" id="upload-btn">画像を選択</button>
              ${imageData ? '<button type="button" class="admin-btn-sm" id="remove-image-btn">画像を削除</button>' : ''}
              <span class="admin-image-status" id="upload-status"></span>
            </div>
          </div>
        </div>
        <div class="admin-field">
          <label for="post-body">本文</label>
          <textarea id="post-body" rows="16" placeholder="記事の本文を入力&#10;&#10;段落は空行で区切ってください">${escapeHtml(post?.body || '')}</textarea>
        </div>
        <div id="editor-error" class="admin-error" style="display:none;"></div>
        <div class="admin-editor-actions">
          <button type="button" class="admin-btn-ghost" id="cancel-btn">キャンセル</button>
          <button type="submit" class="admin-btn-primary" id="save-btn">保存する</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('back-to-list').addEventListener('click', loadPostList);
  document.getElementById('cancel-btn').addEventListener('click', loadPostList);

  const uploadBtn = document.getElementById('upload-btn');
  const fileInput = document.getElementById('post-image');
  uploadBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const status = document.getElementById('upload-status');
    status.textContent = '処理中...';
    try {
      imageData = await compressImage(file);
      const preview = document.getElementById('image-preview');
      const img = document.createElement('img');
      img.src = imageData;
      img.className = 'admin-image-preview';
      img.id = 'image-preview';
      preview.replaceWith(img);
      status.textContent = '画像を読み込みました';
      if (!document.getElementById('remove-image-btn')) {
        const rm = document.createElement('button');
        rm.type = 'button';
        rm.className = 'admin-btn-sm';
        rm.id = 'remove-image-btn';
        rm.textContent = '画像を削除';
        rm.addEventListener('click', removeImage);
        uploadBtn.insertAdjacentElement('afterend', rm);
      }
    } catch {
      status.textContent = '画像の読み込みに失敗しました';
    }
  });

  const removeBtnInit = document.getElementById('remove-image-btn');
  if (removeBtnInit) removeBtnInit.addEventListener('click', removeImage);

  function removeImage() {
    imageData = '';
    const preview = document.getElementById('image-preview');
    const ph = document.createElement('div');
    ph.className = 'admin-image-placeholder';
    ph.id = 'image-preview';
    ph.textContent = '画像なし';
    preview.replaceWith(ph);
    const rm = document.getElementById('remove-image-btn');
    if (rm) rm.remove();
    document.getElementById('upload-status').textContent = '';
  }

  document.getElementById('editor-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleSave(post, () => imageData);
  });
}

async function handleSave(existingPost, getImage) {
  const errorEl = document.getElementById('editor-error');
  const btn = document.getElementById('save-btn');

  const payload = {
    title: document.getElementById('post-title').value.trim(),
    date: document.getElementById('post-date').value,
    body: document.getElementById('post-body').value,
    image_url: getImage() || '',
    published: document.getElementById('post-published').value === 'true',
  };

  if (!payload.title || !payload.date) {
    errorEl.textContent = 'タイトルと日付は必須です。';
    errorEl.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = '保存中...';
  errorEl.style.display = 'none';

  const { ok, data } = existingPost
    ? await api(`/api/posts/${existingPost.id}`, { method: 'PATCH', body: JSON.stringify(payload) })
    : await api('/api/posts', { method: 'POST', body: JSON.stringify(payload) });

  if (!ok) {
    errorEl.textContent = `保存に失敗しました${data?.error ? `（${data.error}）` : ''}。画像が大きすぎる場合は小さい画像をお試しください。`;
    errorEl.style.display = 'block';
    btn.disabled = false;
    btn.textContent = '保存する';
    return;
  }

  await loadPostList();
}

// ============================================
// PASSWORD CHANGE
// ============================================

function renderPasswordForm() {
  const content = document.getElementById('admin-content');
  content.innerHTML = `
    <div class="admin-editor" style="max-width:480px;">
      <div class="admin-editor-header">
        <button class="admin-btn-ghost" id="pw-back">← 一覧に戻る</button>
        <h3>パスワード変更</h3>
      </div>
      <form id="pw-form" class="admin-editor-form">
        <div class="admin-field">
          <label for="pw-current">現在のパスワード</label>
          <input type="password" id="pw-current" required autocomplete="current-password">
        </div>
        <div class="admin-field">
          <label for="pw-next">新しいパスワード（8文字以上）</label>
          <input type="password" id="pw-next" required minlength="8" autocomplete="new-password">
        </div>
        <div id="pw-msg" class="admin-error" style="display:none;"></div>
        <div class="admin-editor-actions">
          <button type="button" class="admin-btn-ghost" id="pw-cancel">キャンセル</button>
          <button type="submit" class="admin-btn-primary" id="pw-save">変更する</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('pw-back').addEventListener('click', loadPostList);
  document.getElementById('pw-cancel').addEventListener('click', loadPostList);

  document.getElementById('pw-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const current = document.getElementById('pw-current').value;
    const next = document.getElementById('pw-next').value;
    const msg = document.getElementById('pw-msg');
    const btn = document.getElementById('pw-save');

    btn.disabled = true;
    btn.textContent = '変更中...';
    msg.style.display = 'none';

    const { ok, data } = await api('/api/password', {
      method: 'POST',
      body: JSON.stringify({ current, next }),
    });

    if (ok) {
      msg.style.cssText =
        'display:block;color:var(--admin-success);background:rgba(90,154,106,0.1);border-color:rgba(90,154,106,0.25);';
      msg.textContent = 'パスワードを変更しました。';
      btn.textContent = '変更しました';
    } else {
      msg.style.display = 'block';
      msg.textContent =
        data && data.error === 'current password invalid'
          ? '現在のパスワードが正しくありません。'
          : 'パスワードの変更に失敗しました。';
      btn.disabled = false;
      btn.textContent = '変更する';
    }
  });
}

// ============================================
// HELPERS
// ============================================

function compressImage(file, maxDim = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function escapeAttr(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderErrorBox(message) {
  return `<div class="admin-error-panel"><p>${message}</p></div>`;
}

// ============================================
// START
// ============================================

init();

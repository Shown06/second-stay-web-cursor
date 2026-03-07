import './styles/admin.css';
import { supabase } from './lib/supabase.js';

const app = document.getElementById('admin-app');
let currentUser = null;

// ============================================
// INITIALIZATION
// ============================================

async function init() {
    if (!supabase) {
        app.innerHTML = renderError('Supabase が設定されていません。.env ファイルに VITE_SUPABASE_URL と VITE_SUPABASE_ANON_KEY を設定してください。');
        return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        renderDashboard();
    } else {
        renderLogin();
    }

    // Auth state change listener
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
            currentUser = session.user;
            renderDashboard();
        } else if (event === 'SIGNED_OUT') {
            currentUser = null;
            renderLogin();
        }
    });
}

// ============================================
// LOGIN
// ============================================

function renderLogin() {
    app.innerHTML = `
    <div class="admin-login">
      <div class="admin-login-card">
        <div class="admin-login-header">
          <h1 class="admin-logo">SECOND STAY</h1>
          <p class="admin-login-subtitle">管理画面</p>
        </div>
        <form id="login-form" class="admin-login-form">
          <div class="admin-field">
            <label for="email">メールアドレス</label>
            <input type="email" id="email" required placeholder="admin@example.com" autocomplete="email">
          </div>
          <div class="admin-field">
            <label for="password">パスワード</label>
            <input type="password" id="password" required placeholder="パスワードを入力" autocomplete="current-password">
          </div>
          <div id="login-error" class="admin-error" style="display: none;"></div>
          <button type="submit" class="admin-btn-primary" id="login-btn">ログイン</button>
        </form>
      </div>
    </div>
  `;

    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');
    const btn = document.getElementById('login-btn');

    btn.disabled = true;
    btn.textContent = 'ログイン中...';
    errorEl.style.display = 'none';

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        errorEl.textContent = 'ログインに失敗しました: ' + error.message;
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
          <a href="/" class="admin-logo-sm">SECOND STAY</a>
          <nav class="admin-nav">
            <span class="admin-user">${currentUser?.email || ''}</span>
            <button class="admin-btn-ghost" id="logout-btn">ログアウト</button>
          </nav>
        </div>
      </header>
      <main class="admin-main">
        <div class="admin-container">
          <div class="admin-toolbar">
            <h2 class="admin-title">記事管理</h2>
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
        await supabase.auth.signOut();
    });

    document.getElementById('new-post-btn').addEventListener('click', () => {
        renderEditor(null);
    });

    await loadPostList();
}

async function loadPostList() {
    const content = document.getElementById('admin-content');
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        content.innerHTML = renderError('記事の取得に失敗しました: ' + error.message);
        return;
    }

    if (!posts || posts.length === 0) {
        content.innerHTML = `
      <div class="admin-empty">
        <p>まだ記事がありません。「＋ 新規作成」をクリックして最初の記事を作成しましょう。</p>
      </div>
    `;
        return;
    }

    content.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>タイトル</th>
            <th>日付</th>
            <th>状態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${posts.map(post => `
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
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

    // Edit buttons
    content.querySelectorAll('.admin-btn-edit').forEach(btn => {
        btn.addEventListener('click', async () => {
            const post = posts.find(p => p.id === btn.dataset.id);
            if (post) renderEditor(post);
        });
    });

    // Delete buttons
    content.querySelectorAll('.admin-btn-delete').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!confirm('この記事を削除してもよろしいですか？')) return;
            const { error } = await supabase.from('posts').delete().eq('id', btn.dataset.id);
            if (error) {
                alert('削除に失敗しました: ' + error.message);
            } else {
                await loadPostList();
            }
        });
    });
}

// ============================================
// EDITOR
// ============================================

function renderEditor(post) {
    const isEdit = !!post;
    const content = document.getElementById('admin-content');

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
          <label for="post-image">画像</label>
          <div class="admin-image-upload">
            ${post?.image_url ? `<img src="${post.image_url}" class="admin-image-preview" id="image-preview">` : '<div class="admin-image-placeholder" id="image-preview">画像なし</div>'}
            <div class="admin-image-controls">
              <input type="file" id="post-image" accept="image/*" style="display: none;">
              <button type="button" class="admin-btn-sm" id="upload-btn">画像を選択</button>
              <span class="admin-image-status" id="upload-status"></span>
            </div>
          </div>
          <input type="hidden" id="post-image-url" value="${escapeAttr(post?.image_url || '')}">
        </div>
        <div class="admin-field">
          <label for="post-body">本文</label>
          <textarea id="post-body" rows="16" placeholder="記事の本文を入力&#10;&#10;段落は空行で区切ってください">${post?.body || ''}</textarea>
        </div>
        <div id="editor-error" class="admin-error" style="display: none;"></div>
        <div class="admin-editor-actions">
          <button type="button" class="admin-btn-ghost" id="cancel-btn">キャンセル</button>
          <button type="submit" class="admin-btn-primary" id="save-btn">保存する</button>
        </div>
      </form>
    </div>
  `;

    document.getElementById('back-to-list').addEventListener('click', () => loadPostList());
    document.getElementById('cancel-btn').addEventListener('click', () => loadPostList());

    // Image upload
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('post-image');
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleImageUpload);

    // Form submit
    document.getElementById('editor-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleSave(post);
    });
}

async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const status = document.getElementById('upload-status');
    const preview = document.getElementById('image-preview');
    status.textContent = 'アップロード中...';

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, { upsert: true });

    if (error) {
        status.textContent = 'エラー: ' + error.message;
        return;
    }

    const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path);

    document.getElementById('post-image-url').value = publicUrl;

    // Update preview
    if (preview.tagName === 'IMG') {
        preview.src = publicUrl;
    } else {
        const img = document.createElement('img');
        img.src = publicUrl;
        img.className = 'admin-image-preview';
        img.id = 'image-preview';
        preview.replaceWith(img);
    }

    status.textContent = 'アップロード完了';
}

async function handleSave(existingPost) {
    const errorEl = document.getElementById('editor-error');
    const btn = document.getElementById('save-btn');

    const postData = {
        title: document.getElementById('post-title').value.trim(),
        date: document.getElementById('post-date').value,
        body: document.getElementById('post-body').value,
        image_url: document.getElementById('post-image-url').value || null,
        published: document.getElementById('post-published').value === 'true',
    };

    if (!postData.title || !postData.date) {
        errorEl.textContent = 'タイトルと日付は必須です';
        errorEl.style.display = 'block';
        return;
    }

    btn.disabled = true;
    btn.textContent = '保存中...';
    errorEl.style.display = 'none';

    let result;
    if (existingPost) {
        result = await supabase.from('posts').update(postData).eq('id', existingPost.id);
    } else {
        result = await supabase.from('posts').insert(postData);
    }

    if (result.error) {
        errorEl.textContent = '保存に失敗しました: ' + result.error.message;
        errorEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = '保存する';
        return;
    }

    await loadPostList();
}

// ============================================
// HELPERS
// ============================================

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

function escapeAttr(str) {
    return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderError(message) {
    return `<div class="admin-error-panel"><p>${message}</p></div>`;
}

// ============================================
// START
// ============================================

init();

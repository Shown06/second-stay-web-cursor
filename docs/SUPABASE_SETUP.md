# Supabase セットアップ手順

## 1. プロジェクト作成

1. [Supabase](https://supabase.com/) でアカウント作成（無料）
2. 「New Project」でプロジェクト作成
3. ダッシュボードの **Settings → API** から以下を取得:
   - **Project URL** → `.env` の `VITE_SUPABASE_URL`
   - **anon public key** → `.env` の `VITE_SUPABASE_ANON_KEY`

## 2. テーブル作成

SQL Editor で以下を実行:

```sql
-- posts テーブル
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  body TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 更新日時の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- インデックス
CREATE INDEX idx_posts_date ON posts (date DESC);
CREATE INDEX idx_posts_published ON posts (published);
```

## 3. RLS（Row Level Security）設定

```sql
-- RLS を有効化
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 読み取り: 誰でも可（公開記事のみ）
CREATE POLICY "Public read access"
  ON posts FOR SELECT
  USING (published = true);

-- 認証済みユーザーは全件読み取り可（管理画面用）
CREATE POLICY "Authenticated read all"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

-- 挿入: 認証済みのみ
CREATE POLICY "Authenticated insert"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 更新: 認証済みのみ
CREATE POLICY "Authenticated update"
  ON posts FOR UPDATE
  TO authenticated
  USING (true);

-- 削除: 認証済みのみ
CREATE POLICY "Authenticated delete"
  ON posts FOR DELETE
  TO authenticated
  USING (true);
```

## 4. Storage バケット作成

1. ダッシュボード → **Storage** → 「New Bucket」
2. バケット名: `blog-images`
3. **Public bucket**: ON（画像をURLで公開表示するため）

Storage ポリシー設定（SQL Editor）:

```sql
-- 誰でも画像を閲覧可能
CREATE POLICY "Public read blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- 認証済みユーザーのみアップロード可能
CREATE POLICY "Authenticated upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

-- 認証済みユーザーのみ削除可能
CREATE POLICY "Authenticated delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');
```

## 5. 管理者ユーザー作成

1. ダッシュボード → **Authentication** → **Users** → 「Add User」
2. メールアドレスとパスワードを設定
3. このアカウントで `/admin.html` にログインする

## 6. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

> `.env` は `.gitignore` に含まれているため、Gitにはコミットされません。
> 本番環境ではホスティングサービスの環境変数設定で指定してください。

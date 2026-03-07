# ブログ機能・管理画面 実装依頼プロンプト（アンチグラビティ用）

以下をそのままアンチグラビティに渡して実装を依頼してください。

---

## 依頼文（コピー用）

```
【プロジェクト】
Second Stay のコーポレートサイト（兵庫・高級宿泊施設）。Vite でビルドする静的サイトで、Vanilla JS の SPA 構成。既存は index.html + src/main.js で #top, #company, #business, #facilities, #contact などのセクションがある。

【やりたいこと】
1. ブログ（お知らせ）機能を追加する
2. 管理画面を1つ作り、そこでブログ記事を「書く・編集・削除」できるようにする
3. 管理画面で保存・更新すると、ホームページ側のブログ表示がそのまま更新されるようにする
4. 本番は別ドメイン・別サーバーで運用する想定なので、Netlify 専用の仕組みにはしないこと

【技術方針】
- 保存先: Supabase（無料枠）を使う
  - テーブル: posts（id, title, date, body, image_url, created_at など）
  - 画像: Supabase Storage にアップロードし、URL を posts に保存する形でよい
- 認証: 管理画面には Supabase Auth（メール＋パスワード）でログイン必須にする。未ログインならログイン画面を表示
- ホームページ側: ブログは誰でも閲覧可能（認証不要）。Supabase から posts を取得して表示するだけ

【実装してほしいこと】

1. Supabase 側の準備（手順書でも可）
   - プロジェクトでテーブル posts を作成（タイトル、日付、本文、画像URL、作成日時 など）
   - Storage にブログ用バケット（例: blog-images）を作成し、アップロード許可設定
   - 環境変数（VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY）で参照できるようにする

2. 管理画面
   - URL は /admin または /admin.html でアクセスできるようにする（このプロジェクトに admin 用の HTML + JS を追加）
   - 機能: ログイン / 記事一覧表示 / 新規作成 / 編集 / 削除
   - 入力項目: タイトル、日付、本文（テキストエリアで可）、画像（アップロード → Storage に保存し URL を保存）
   - 保存時に Supabase の posts に insert または update。画像は Storage にアップロードしてから URL を渡す

3. ホームページ（既存サイト）側
   - ヘッダーナビに「お知らせ」リンクを追加（例: href="#blog"）
   - ブログ一覧: #blog で表示。Supabase から posts を取得し、日付順でカード一覧表示
   - ブログ詳細: #blog/スラッグ または #blog?id=xxx などで1件表示。既存のデザイン（home.css など）のトーンに合わせる
   - トップページ（ホーム）に「お知らせ」セクションを1つ追加し、最新3件だけ表示。「もっと見る」で #blog へ
   - 既存の main.js の SPA 構成に合わせ、hash や表示切替でブログ一覧・詳細が表示されるようにする

4. セキュリティ・運用
   - 管理画面は Supabase の Row Level Security (RLS) で、認証済みユーザーだけが posts の insert/update/delete できるようにする。読み取りは未認証でも可（ホーム用）
   - 環境変数は .env で管理し、.env.example に必要なキー名だけ記載する

【既存コードの参照】
- ナビ: src/components/header.js の nav-link
- メインのページ構成: src/main.js の createHomePage, createCompanyPage など
- スタイル: src/styles/home.css, variables.css, layout.css を参考にブログも同じトーンで
- ルーティング: 現状は hash で #company, #facilities など。ブログは #blog, #blog/スラッグ のように追加

【制約】
- 無料で済む範囲（Supabase 無料枠）で実装すること
- 複雑な「連携」や「パイプライン」は不要。「管理画面で保存 → ホームが同じ DB を読んで表示」のシンプルな流れでよい
```

---

## 補足（依頼者用）

- 上記をアンチグラビティに貼り付けて依頼すれば、Supabase の作成手順から管理画面・ホーム側のブログ表示まで一通り実装してもらえる想定です。
- 依頼後に Supabase のプロジェクトURL・anon key を共有する必要がある場合は、.env の設定手順も依頼文に含めています。
- このファイルは依頼用なので、実装が終わったら削除しても問題ありません。

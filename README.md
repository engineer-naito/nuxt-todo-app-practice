# Todo アプリ

## 技術スタック

- Web フレームワーク
<img src="https://img.shields.io/badge/-Nuxt-181818.svg?logo=nuxt.js&style=plastic" />
<br />

- DB(PostgreSQL) & 認証
<img src="https://img.shields.io/badge/-supabase-181818.svg?logo=supabase&style=plastic" />
<br />

- ORM
<img src="https://img.shields.io/badge/-prisma-181818.svg?logo=prisma&style=plastic" />
<br />

- CSS
<img src="https://img.shields.io/badge/-unocss-181818.svg?logo=unocss&style=plastic" />
<br />

- パッケージ管理
<img src="https://img.shields.io/badge/-pnpm-181818.svg?logo=pnpm&style=plastic" />
<br />


## 事前準備

### Docker

- Docker Desktop for Mac のインストール
https://matsuand.github.io/docs.docker.jp.onthefly/desktop/mac/install/


### Supabase

- Supabase のアカウント登録(サインアップ)
https://supabase.com/


### Git


### VS Code

- 拡張機能『Dev Containers』をインストール
https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers


## 環境構築

1. GitHub からリポジトリをクローン
https://github.com/kosuke222naito/nuxt-todo-app-practice

    ```bash
    $ git clone https://github.com/kosuke222naito/nuxt-todo-app-practice.git
    ```

2. VS Code で Dev Container を起動
    1. VS Code でプロジェクトを開く
    2. Dev Container 起動
      c.f.
      ![alt text](https://microsoft.github.io/vscode-remote-release/images/remote-containers-readme.gif)

3. VS Code のターミナルなどでコンテナ内 `workspace` ディレクトリに移動

4. Supabase の設定
  1. ブラウザで Supabase にサインイン状態でターミナルで以下を入力
    ```bash
    $ pnpm supabase login
    ```
  2. ターミナルに表示されるリンク先からアクセストークンを取得し、入力する
  3. Supabase コンテナを作成、起動する
    ```bash
    $ pnpm supabase start
    ```
    ※初回は時間がかかる
  4. 3.完了後、ターミナルに表示される情報をメモっておく

    ```
    API URL: http://127.0.0.1:54321
    GraphQL URL: http://127.0.0.1:54321/graphql/v1
    S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
    DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
    Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
    JWT secret: *****
    anon key: *****
    service_role key: *****
    S3 Access Key: *****
    S3 Secret Key: *****
    S3 Region: local
    ```

  5. プロジェクト直下に `.env.example` を参考に `.env` を作成する
    ```.env
    SUPABASE_URL="{API URL}"
    SUPABASE_KEY="{anon_key}"

    DATABASE_URL="{DB URL}"
    ```

5. Prisma の設定
    1. Prisma クライアントの生成
      ```bash
      $ pnpm prisma generate
      ```

    2. 初回 DB マイグレーション
    ```bash
    $ pnpm prisma migrate dev --name init
    ```

    3. マイグレーションの成功を確認する
      1. `localhost:54323` (Supabase Studio) でサイドバーから　Table Editor を開く(`http://localhost:54323/project/default/editor`)

      2. `UserProfile`, `Todo` テーブルが表示されていることを確認する

6. `UserProfile` テーブルにユーザに対応するレコードを追加する
    1. Supabase Studio などで、Authentication の `Users` または `/supabase/seed.sql` の内容を確認する

    2. 1.の内容をもとに、`UserProfile` にレコードを追加する
      - `Users.UID` と `UserProfile.userId` が紐づく
      - `userId`, `displayName`, `createdAt`, `updatedAt` は必須入力


## 開発サーバ起動

```bash
$ pnpm dev
```

`http://localhost:3000`:



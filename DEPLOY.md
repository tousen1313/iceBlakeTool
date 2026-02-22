# Vercel デプロイ手順書

## 前提条件

- Node.js がインストールされていること
- Vercel アカウントを持っていること（https://vercel.com）

---

## 初回のみ：ログイン

```bash
npx vercel login
```

ブラウザが開くので GitHub / Google などでログインする。

---

## デプロイ手順

### 1. ビルドが通るか確認

```bash
npm run build
```

エラーが出た場合はデプロイ前に修正する。

### 2. 本番デプロイ

```bash
npx vercel --prod --yes
```

完了すると以下の2種類の URL が表示される：

| URL | 内容 |
|-----|------|
| `https://ice-blake-tool.vercel.app` | 本番 URL（固定・毎回同じ） |
| `https://ice-blake-tool-xxxxxxx.vercel.app` | デプロイごとのユニーク URL |

---

## よく使うコマンド

```bash
# ログイン状態の確認
npx vercel whoami

# デプロイ履歴・ログの確認
npx vercel inspect <デプロイURL> --logs

# 直前のデプロイを再実行
npx vercel redeploy <デプロイURL>
```

---

## 注意事項

- `npm run build` が成功しないとデプロイも失敗する
- `.vercel/` ディレクトリはプロジェクトとの紐付け情報なので削除しない
- ログインセッションが切れた場合は再度 `npx vercel login` を実行する

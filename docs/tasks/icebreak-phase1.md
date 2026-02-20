# Phase 1: 環境構築・データ層

## フェーズ概要

| 項目 | 内容 |
|------|------|
| レイヤー | 基盤・静的データ層 |
| 対象タスク | TASK-0001 〜 TASK-0004 |
| 推定工数 | 7時間 |
| タスクタイプ | DIRECT（全タスク） |
| 前提条件 | Node.js / npm がインストール済み |
| 成果物 | 起動可能な Next.js プロジェクト + 型定義 + 質問データ + スタイル設定 |
| マイルストーン | M1: 開発環境完成 |

## 目標

- Next.js プロジェクトを初期化し、ローカル開発環境を整える
- TypeScript 型定義・質問プールデータ・Tailwind CSS 設定を完成させ、Phase 2 の実装に着手できる状態にする

---

## タスク詳細

---

### ✅ TASK-0001: Next.js プロジェクト初期化

- **タスクタイプ**: DIRECT
- **推定工数**: 2時間
- **依存タスク**: なし
- **要件リンク**: REQ-401（Vercel無料プラン）、REQ-402（外部API不使用）
- **要件名**: Next.js プロジェクトの初期セットアップ

#### 実装詳細

```bash
# プロジェクト作成コマンド
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

作成後に以下を確認・設定する：

1. `next.config.ts` — デフォルト設定で問題なし（静的エクスポート不要、Vercel が Next.js を直接サポート）
2. `tsconfig.json` — `strict: true` が有効になっていることを確認
3. `package.json` — scripts を確認（`dev` / `build` / `start` / `lint`）
4. 不要なボイラープレート削除:
   - `src/app/page.tsx` の中身をクリア（Hello World 程度に簡略化）
   - `public/` 内のサンプル画像を削除

#### 完了条件

- [x] `npm run dev` でローカルサーバーが起動する（`http://localhost:3000`）
- [x] `npm run build` がエラーなく完了する
- [x] TypeScript の strict モードが有効になっている
- [x] Tailwind CSS が適用されている（テキストに className が効くことを確認）

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — `create-next-app` 実行・ボイラープレート整理
2. `/tsumiki:direct-verify` — `npm run dev` / `npm run build` で動作確認

---

### ✅ TASK-0002: TypeScript 型定義ファイル作成

- **タスクタイプ**: DIRECT
- **推定工数**: 1時間
- **依存タスク**: TASK-0001
- **要件リンク**: REQ-001（質問表示）、REQ-002（質問プール）、REQ-003（履歴）
- **要件名**: 全コンポーネント・フックで使用する TypeScript 型定義

#### 実装詳細

`src/types/index.ts` を作成する。設計文書 `docs/design/icebreak/interfaces.ts` の内容をそのまま実装する。

作成する型：

| 型名 | 種別 | 説明 |
|------|------|------|
| `Question` | interface | 質問エンティティ（id / text / category） |
| `QuestionCategory` | type | `"humor" \| "light"` |
| `IceBreakState` | interface | アプリの状態（currentQuestion / history / questionNumber） |
| `UseIceBreakReturn` | interface | useIceBreak フックの戻り値型 |
| `QuestionCardProps` | interface | QuestionCard コンポーネントの Props |
| `NextButtonProps` | interface | NextButton コンポーネントの Props |
| `HistoryListProps` | interface | HistoryList コンポーネントの Props |

#### 完了条件

- [ ] `src/types/index.ts` が作成されている
- [ ] 全型定義が export されている
- [ ] TypeScript コンパイルエラーがない（`npx tsc --noEmit`）

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — `src/types/index.ts` 作成
2. `/tsumiki:direct-verify` — `npx tsc --noEmit` でコンパイル確認

---

### ✅ TASK-0003: Tailwind CSS 設定・グローバルスタイル

- **タスクタイプ**: DIRECT
- **推定工数**: 1時間
- **依存タスク**: TASK-0001
- **要件リンク**: REQ-004（ポップ・カラフルUI）、NFR-201（レスポンシブ）
- **要件名**: ポップ・カラフルなデザインの基盤となるスタイル設定

#### 実装詳細

1. **`tailwind.config.ts`** — カスタムカラーパレットを追加:
   - メインカラー: 明るいオレンジ・ピンク・パープル・シアン等
   - アニメーション: ボタンのホバーエフェクト用

2. **`src/app/globals.css`** — ベーススタイル設定:
   - Tailwind のディレクティブ（`@tailwind base/components/utilities`）
   - ボディの背景色（グラデーション等、ポップな雰囲気）
   - フォントサイズのベース設定

3. **`src/app/layout.tsx`** — メタデータ設定:
   - `title`: "アイスブレイクタイム！"
   - `description`: "オンライン会議を盛り上げるアイスブレイクツール"
   - 日本語フォント（Noto Sans JP 等）を Google Fonts から設定

#### UI/UX要件

- モバイル対応: `viewport` メタタグが設定されていること
- フォント: 日本語テキストが美しく表示されること

#### 完了条件

- [ ] `tailwind.config.ts` にカスタムカラーが追加されている
- [ ] `globals.css` にベーススタイルが設定されている
- [ ] `layout.tsx` のメタデータが日本語で設定されている
- [ ] ブラウザで表示してポップな背景色が適用されている

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — tailwind.config / globals.css / layout.tsx 設定
2. `/tsumiki:direct-verify` — ブラウザで背景色・フォントを目視確認

---

### ✅ TASK-0004: 質問プールデータ作成

- **タスクタイプ**: DIRECT
- **推定工数**: 3時間
- **依存タスク**: TASK-0001、TASK-0002
- **要件リンク**: REQ-002（質問プール）、EDGE-101（重複許容）
- **要件名**: ユーモア・軽い系日本語質問の静的データセット作成

#### 実装詳細

`src/data/questions.ts` を作成する。

```typescript
import { Question } from "@/types";

export const questions: Question[] = [
  { id: 1, text: "もし動物に生まれ変われるなら何になりたい？その理由は？", category: "humor" },
  { id: 2, text: "無人島に1つだけ持っていくとしたら何を選ぶ？", category: "light" },
  // ... 50問以上
];
```

**質問の方針**:
- カテゴリ `"humor"`: 笑えるネタ・ちょっとシュールな質問（20問以上）
- カテゴリ `"light"`: 気軽に答えられる質問（30問以上）
- 1問あたり30〜60文字程度（画面に収まる長さ）
- オンライン会議の参加者が答えやすいもの

**質問例（humor）**:
- 「もし給食メニューを1つだけ復活させるとしたら何？」
- 「スーパーヒーローになれるとしたら、どんな能力が欲しい？」
- 「時間を遡れるとしたら、何歳に戻ってどんなことをしたい？」

**質問例（light）**:
- 「最近ハマっているものは何ですか？」
- 「今週末、晴れたら何をしたいですか？」
- 「好きな食べ物を1つだけ教えてください！」

#### 完了条件

- [ ] `src/data/questions.ts` が作成されている
- [ ] 質問が50問以上含まれている
- [ ] 全質問が `Question` 型に準拠している
- [ ] TypeScript コンパイルエラーがない
- [ ] humor / light の両カテゴリに質問が存在する

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — `src/data/questions.ts` 作成（50問以上）
2. `/tsumiki:direct-verify` — TypeScript 型チェック・質問数確認

---

## Phase 1 完了条件（マイルストーン M1）

- [ ] `npm run dev` でアプリが起動する
- [ ] `npm run build` がエラーなく完了する
- [ ] `npx tsc --noEmit` でコンパイルエラーがない
- [ ] `src/types/index.ts` の全型定義が揃っている
- [ ] `src/data/questions.ts` に50問以上の質問がある
- [ ] Tailwind CSS のカスタムスタイルが適用されている

**→ Phase 1 完了後、[Phase 2](icebreak-phase2.md) に進む**

# Phase 2: ロジック層・UI層実装

## フェーズ概要

| 項目           | 内容                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| レイヤー       | ロジック層（カスタムフック）・UI層（コンポーネント・ページ）              |
| 対象タスク     | TASK-0005 〜 TASK-0009                                                    |
| 推定工数       | 18時間                                                                    |
| タスクタイプ   | TDD（全タスク）                                                           |
| 前提条件       | Phase 1（TASK-0001〜0004）完了済み                                        |
| 成果物         | 動作する全コンポーネント + メインページ（ローカルで受け入れ基準を満たす） |
| マイルストーン | M2: 機能完成                                                              |

## 目標

- `useIceBreak` カスタムフックでランダム質問選択・履歴管理ロジックを実装する
- `QuestionCard` / `NextButton` / `HistoryList` の3コンポーネントを実装する
- `page.tsx` で全コンポーネントを統合し、受け入れ基準を満たす完成形を作る

---

## タスク詳細

---

### ✅ TASK-0005: useIceBreak カスタムフック実装

- **タスクタイプ**: TDD
- **推定工数**: 4時間
- **依存タスク**: TASK-0001、TASK-0002、TASK-0004
- **要件リンク**: REQ-001（ランダム質問）、REQ-101（次の質問）、REQ-102（履歴追加）、REQ-201（ボタン常時表示）
- **要件名**: ランダム質問選択と履歴管理のロジックを担うカスタムフック

#### 実装詳細

**ファイル**: `src/hooks/useIceBreak.ts`

```typescript
// フックの骨格
export function useIceBreak(): UseIceBreakReturn {
  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(/* 初期ランダム質問 */);
  const [history, setHistory] = useState<Question[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(1);

  const nextQuestion = useCallback(() => {
    // 1. currentQuestion を history に追加
    // 2. questions 配列からランダムに次の質問を選択
    // 3. questionNumber をインクリメント
  }, [currentQuestion]);

  return { currentQuestion, history, questionNumber, nextQuestion };
}
```

**ロジック仕様**:

- 初期化時: `questions` 配列からランダムに1問選択（`Math.random()`）
- `nextQuestion()`: 現在の質問を `history` に追加後、新しいランダム質問を選択
- 重複チェック: 不要（EDGE-101 — 重複許容）
- `questionNumber`: 初期値 `1`、`nextQuestion()` 呼び出しごとにインクリメント

#### テスト要件

**単体テスト** (`src/hooks/useIceBreak.test.ts`):

| テストケース          | 内容                                                                  |
| --------------------- | --------------------------------------------------------------------- |
| 初期化テスト          | フック初期化後に `currentQuestion` が `questions` の中の1つであること |
| nextQuestion テスト   | `nextQuestion()` 呼び出し後に `history` に前の質問が追加されること    |
| questionNumber テスト | `nextQuestion()` 呼び出しごとに `questionNumber` が +1 されること     |
| 重複テスト            | 同じ質問が連続して出ても正常動作すること                              |

#### 統合テスト要件

- コンポーネントと組み合わせて `nextQuestion()` が画面に反映されること（Phase 2 統合テストで確認）

#### 完了条件

- [ ] `src/hooks/useIceBreak.ts` が作成されている
- [ ] `useIceBreak` フックが `UseIceBreakReturn` 型を返す
- [ ] 初期化時にランダムな質問が選ばれる
- [ ] `nextQuestion()` で history が更新される
- [ ] `nextQuestion()` で questionNumber がインクリメントされる
- [ ] 単体テストが全件パスする

#### TDDプロセス

1. `/tsumiki:tdd-requirements` — フックの詳細要件定義
2. `/tsumiki:tdd-testcases` — 上記テストケースを洗い出し
3. `/tsumiki:tdd-red` — 失敗するテストを実装
4. `/tsumiki:tdd-green` — テストを通す最小実装
5. `/tsumiki:tdd-refactor` — `useCallback` 等でリファクタリング
6. `/tsumiki:tdd-verify-complete` — 全テスト通過確認

---

### ✅ TASK-0006: QuestionCard コンポーネント実装

- **タスクタイプ**: TDD
- **推定工数**: 4時間
- **依存タスク**: TASK-0002、TASK-0003、TASK-0005
- **要件リンク**: REQ-001（質問表示）、REQ-004（ポップUI）、REQ-302（質問番号）、NFR-202（中央配置・大きなボタン）
- **要件名**: 現在の質問を大きく・カラフルに表示するカード型コンポーネント

#### 実装詳細

**ファイル**: `src/components/QuestionCard.tsx`

Props: `QuestionCardProps`（`question: Question` / `questionNumber: number`）

**UI仕様**:

- カード外観: 丸みのある白いカード、カラフルなシャドウ or ボーダー
- 質問番号: `Q.{questionNumber}` の形式で表示（小さめ・グレー系）
- 質問文: 大きなフォントサイズ（`text-2xl` 〜 `text-3xl`）、中央揃え
- カード幅: 最大幅を設定し中央配置（`max-w-2xl mx-auto`）
- カード内余白: 十分なパディング（`p-8` 程度）

```tsx
// 例
<div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border-4 border-purple-300">
  <p className="text-sm text-gray-400 mb-4">Q.{questionNumber}</p>
  <p className="text-2xl font-bold text-gray-800 text-center leading-relaxed">
    {question.text}
  </p>
</div>
```

#### テスト要件

**単体テスト** (`src/components/QuestionCard.test.tsx`):

| テストケース       | 内容                                             |
| ------------------ | ------------------------------------------------ |
| 質問文表示テスト   | `question.text` が画面に表示されること           |
| 質問番号表示テスト | `Q.{questionNumber}` 形式で番号が表示されること  |
| レンダリングテスト | コンポーネントがエラーなくレンダリングされること |

#### UI/UX要件

- **ローディング状態**: なし（静的レンダリング）
- **エラー表示**: question が undefined の場合は何も表示しない（EDGE-001 対応）
- **モバイル対応**: 小画面でもテキストが読みやすいこと（`text-xl` にフォールバック）
- **アクセシビリティ**: 質問文は `aria-live="polite"` で読み上げ対応

#### 完了条件

- [ ] `src/components/QuestionCard.tsx` が作成されている
- [ ] `QuestionCardProps` 型を Props として受け取る
- [ ] 質問文と質問番号が正しく表示される
- [ ] カラフル・ポップなデザインが適用されている
- [ ] モバイル表示で文字が読みやすい
- [ ] 単体テストが全件パスする

#### TDDプロセス

1. `/tsumiki:tdd-requirements` — コンポーネントの表示仕様確認
2. `/tsumiki:tdd-testcases` — 表示内容のテストケース洗い出し
3. `/tsumiki:tdd-red` — React Testing Library でテスト実装
4. `/tsumiki:tdd-green` — コンポーネント最小実装
5. `/tsumiki:tdd-refactor` — Tailwind クラス整理・レスポンシブ対応
6. `/tsumiki:tdd-verify-complete` — 全テスト通過確認

---

### ✅ TASK-0007: NextButton コンポーネント実装

- **タスクタイプ**: TDD
- **推定工数**: 3時間
- **依存タスク**: TASK-0002、TASK-0003
- **要件リンク**: REQ-101（次の質問ボタン）、REQ-201（ボタン常時表示）、NFR-202（中央・大きく）、NFR-301（キーボード操作）
- **要件名**: 次の質問を表示するメインアクションボタン

#### 実装詳細

**ファイル**: `src/components/NextButton.tsx`

Props: `NextButtonProps`（`onClick: () => void` / `disabled?: boolean`）

**UI仕様**:

- ボタンサイズ: 大きめ（`px-12 py-5` 程度）
- 色: カラフルなグラデーション（例: `from-pink-500 to-orange-400`）
- 文字: 「🎲 次の質問へ！」（白文字・太字）
- ホバー: スケールアップ（`hover:scale-105 transition-transform`）
- フォーカス: キーボード操作用のフォーカスリング（`focus:ring-4`）
- 無効状態: `disabled` 時はグレーアウト・クリック不可

```tsx
// 例
<button
  onClick={onClick}
  disabled={disabled}
  className="px-12 py-5 bg-gradient-to-r from-pink-500 to-orange-400
             text-white text-xl font-bold rounded-full shadow-lg
             hover:scale-105 transition-transform
             focus:outline-none focus:ring-4 focus:ring-pink-300
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  🎲 次の質問へ！
</button>
```

#### テスト要件

**単体テスト** (`src/components/NextButton.test.tsx`):

| テストケース       | 内容                                             |
| ------------------ | ------------------------------------------------ |
| クリックテスト     | ボタンクリックで `onClick` が呼ばれること        |
| 無効状態テスト     | `disabled=true` 時にボタンがクリックできないこと |
| レンダリングテスト | ボタンが正しくレンダリングされること             |
| キーボードテスト   | Enter / Space キーで `onClick` が呼ばれること    |

#### UI/UX要件

- **ローディング状態**: なし
- **エラー表示**: なし
- **モバイル対応**: タップしやすいサイズ（最低 44px 高さ）
- **アクセシビリティ**: `aria-label="次の質問を表示"` を設定

#### 完了条件

- [ ] `src/components/NextButton.tsx` が作成されている
- [ ] `NextButtonProps` 型を Props として受け取る
- [ ] クリック / Enter / Space で `onClick` が発火する
- [ ] `disabled` 時はクリック不可になる
- [ ] カラフル・目立つデザインになっている
- [ ] 単体テストが全件パスする

#### TDDプロセス

1. `/tsumiki:tdd-requirements` — ボタン仕様確認
2. `/tsumiki:tdd-testcases` — クリック・キーボード・disabled テストケース
3. `/tsumiki:tdd-red` — テスト実装
4. `/tsumiki:tdd-green` — ボタン最小実装
5. `/tsumiki:tdd-refactor` — スタイル・アクセシビリティ整備
6. `/tsumiki:tdd-verify-complete` — 全テスト通過確認

---

### ✅ TASK-0008: HistoryList コンポーネント実装

- **タスクタイプ**: TDD
- **推定工数**: 3時間
- **依存タスク**: TASK-0002、TASK-0003
- **要件リンク**: REQ-003（履歴表示）、REQ-202（履歴1件以上で表示）、EDGE-101（重複許容）
- **要件名**: これまでに表示された質問の履歴一覧コンポーネント

#### 実装詳細

**ファイル**: `src/components/HistoryList.tsx`

Props: `HistoryListProps`（`history: Question[]`）

**UI仕様**:

- 表示条件: `history.length > 0` の場合のみ表示（REQ-202）
- セクションタイトル: 「📋 これまでの質問」
- リスト形式: 番号付きリスト（`1.` `2.` ...）
- 順序: 古い順（先に表示された質問が上）
- スタイル: 薄い背景色のカード、やや小さめのフォント

```tsx
// 例
{
  history.length > 0 && (
    <section aria-label="これまでの質問">
      <h2 className="text-lg font-bold text-gray-600 mb-3">
        📋 これまでの質問
      </h2>
      <ol className="space-y-2">
        {history.map((q, index) => (
          <li
            key={q.id}
            className="text-gray-600 text-sm bg-white/50 rounded-lg p-3"
          >
            {index + 1}. {q.text}
          </li>
        ))}
      </ol>
    </section>
  );
}
```

#### テスト要件

**単体テスト** (`src/components/HistoryList.test.tsx`):

| テストケース | 内容                                                   |
| ------------ | ------------------------------------------------------ |
| 非表示テスト | `history` が空の場合、コンポーネントが表示されないこと |
| 表示テスト   | `history` に1件以上ある場合、リストが表示されること    |
| 件数テスト   | `history` の件数分のリストアイテムが表示されること     |
| 順序テスト   | 最初の質問が1番目に表示されること                      |
| 重複テスト   | 同じ質問が複数回 history にあっても正常表示されること  |

#### UI/UX要件

- **ローディング状態**: なし
- **エラー表示**: なし（空配列時は非表示）
- **モバイル対応**: スクロール可能な高さ制限（`max-h-60 overflow-y-auto`）
- **アクセシビリティ**: `<section aria-label>` と `<ol>` の意味的なマークアップ

#### 完了条件

- [ ] `src/components/HistoryList.tsx` が作成されている
- [ ] `history` が空の場合は非表示になる
- [ ] `history` の全件がリスト表示される
- [ ] 重複質問も正常に表示される
- [ ] 単体テストが全件パスする

#### TDDプロセス

1. `/tsumiki:tdd-requirements` — 履歴表示仕様確認
2. `/tsumiki:tdd-testcases` — 表示・非表示・件数テストケース
3. `/tsumiki:tdd-red` — テスト実装
4. `/tsumiki:tdd-green` — コンポーネント最小実装
5. `/tsumiki:tdd-refactor` — スタイル・スクロール対応
6. `/tsumiki:tdd-verify-complete` — 全テスト通過確認

---

### ✅ TASK-0009: メインページ統合

- **タスクタイプ**: TDD
- **推定工数**: 4時間
- **依存タスク**: TASK-0005、TASK-0006、TASK-0007、TASK-0008
- **要件リンク**: REQ-001〜004、REQ-101、REQ-102、REQ-201、REQ-202、NFR-201、NFR-202
- **要件名**: 全コンポーネントを統合し、受け入れ基準を満たすメインページ

#### 実装詳細

**ファイル**: `src/app/page.tsx`

```tsx
"use client";

import { useIceBreak } from "@/hooks/useIceBreak";
import { QuestionCard } from "@/components/QuestionCard";
import { NextButton } from "@/components/NextButton";
import { HistoryList } from "@/components/HistoryList";

export default function Home() {
  const { currentQuestion, history, questionNumber, nextQuestion } =
    useIceBreak();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 py-12 px-4">
      {/* ヘッダー */}
      <h1 className="text-center text-4xl font-extrabold text-purple-600 mb-8">
        🎉 アイスブレイク！
      </h1>

      {/* 質問カード */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={questionNumber}
      />

      {/* 次の質問ボタン */}
      <div className="flex justify-center mt-8">
        <NextButton onClick={nextQuestion} />
      </div>

      {/* 履歴 */}
      <div className="max-w-2xl mx-auto mt-12">
        <HistoryList history={history} />
      </div>
    </main>
  );
}
```

**レイアウト仕様**:

- 全体背景: グラデーション（ポップ・カラフル）
- 縦方向の並び順: ヘッダー → 質問カード → ボタン → 履歴
- 中央揃え: 全コンテンツを水平中央に配置

#### テスト要件

**統合テスト** (`src/app/page.test.tsx`):

| テストケース     | 内容                                                 |
| ---------------- | ---------------------------------------------------- |
| 初期表示テスト   | ページ表示時に質問が1件表示されること                |
| ボタン動作テスト | 「次の質問へ！」ボタンクリックで質問が切り替わること |
| 履歴追加テスト   | ボタンクリック後に履歴が1件増えること                |
| 複数回操作テスト | ボタンを3回押した後、履歴が3件になること             |

#### UI/UX要件

- **ローディング状態**: なし（`useClient` + 即時レンダリング）
- **エラー表示**: なし
- **モバイル対応**: `px-4` で左右に余白、縦スクロールで全体閲覧可能
- **アクセシビリティ**: `<main>` / `<h1>` の意味的なマークアップ、`aria-live` で動的コンテンツ対応

#### 完了条件

- [ ] `src/app/page.tsx` で全コンポーネントが統合されている
- [ ] ページ表示時にランダムな質問が1問表示される
- [ ] 「次の質問へ！」ボタンで質問が切り替わる
- [ ] 履歴が正しく積み上がっていく
- [ ] スマートフォン（375px）・PC（1280px）で正常表示される
- [ ] 統合テストが全件パスする
- [ ] `npm run build` がエラーなく完了する

#### TDDプロセス

1. `/tsumiki:tdd-requirements` — 統合後の画面仕様確認
2. `/tsumiki:tdd-testcases` — ユーザー操作フローのテストケース
3. `/tsumiki:tdd-red` — 統合テスト実装
4. `/tsumiki:tdd-green` — page.tsx 実装
5. `/tsumiki:tdd-refactor` — レイアウト・レスポンシブ調整
6. `/tsumiki:tdd-verify-complete` — 全テスト通過・ビルド確認

---

## Phase 2 完了条件（マイルストーン M2）

- [ ] 全コンポーネント（QuestionCard / NextButton / HistoryList）の単体テストが通る
- [ ] メインページの統合テストが通る
- [ ] `npm run build` がエラーなく完了する
- [ ] ローカルで受け入れ基準チェックリスト（acceptance-criteria.md）の機能テストが全件通る
- [ ] スマートフォン・PCで正常表示される

**→ Phase 2 完了後、[Phase 3](icebreak-phase3.md) に進む**

# Phase 3: 品質確認・デプロイ

## フェーズ概要

| 項目 | 内容 |
|------|------|
| レイヤー | QA・インフラ・デプロイ |
| 対象タスク | TASK-0010 〜 TASK-0014 |
| 推定工数 | 9時間 |
| タスクタイプ | DIRECT（全タスク） |
| 前提条件 | Phase 2（TASK-0005〜0009）完了済み |
| 成果物 | Vercel 本番URL で公開された完成アプリ |
| マイルストーン | M3: 本番公開 |

## 目標

- レスポンシブデザイン・アクセシビリティを最終確認・調整する
- GitHub リポジトリを整備し、Vercel と連携してデプロイを完了する
- 本番環境で受け入れテストを実施し、品質を確認する

---

## タスク詳細

---

### ✅ TASK-0010: レスポンシブデザイン確認・調整

- **タスクタイプ**: DIRECT
- **推定工数**: 2時間
- **依存タスク**: TASK-0009
- **要件リンク**: NFR-201（レスポンシブデザイン）、REQ-004（ポップUI）
- **要件名**: 各デバイスサイズでの表示品質確認と調整

#### 実装詳細

**確認対象デバイス**（Chrome DevTools で検証）:

| デバイス | 幅 | 確認ポイント |
|----------|-----|------------|
| スマートフォン（iPhone SE） | 375px | 質問カードが収まる・ボタンが押しやすい |
| スマートフォン（iPhone 14 Pro） | 393px | 同上 |
| タブレット（iPad） | 768px | カードが広すぎず読みやすい |
| PC（ラップトップ） | 1280px | 全体が中央配置されて美しい |
| PC（大型モニター） | 1920px | 中央に収まり、空白が多すぎない |

**調整が必要な場合の対応**:
- フォントサイズ: `text-xl md:text-2xl lg:text-3xl` のようにレスポンシブ対応
- ボタンサイズ: `px-8 py-4 md:px-12 md:py-5` のように調整
- カード幅: `max-w-lg md:max-w-2xl` のように調整
- 履歴リスト: 小画面でスクロール可能か確認

#### 完了条件

- [ ] 375px（スマートフォン）で質問文が読みやすく表示される
- [ ] 375px でボタンが押しやすいサイズ（高さ 44px 以上）
- [ ] 1280px（PC）でレイアウトが整って見える
- [ ] Chrome DevTools の "Responsive" モードで全幅で崩れがない
- [ ] 横スクロールが発生しない

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — Chrome DevTools でデバイスごとに確認・Tailwind クラスを調整
2. `/tsumiki:direct-verify` — 各ブレークポイントで目視確認

---

### ✅ TASK-0011: アクセシビリティ確認・調整

- **タスクタイプ**: DIRECT
- **推定工数**: 2時間
- **依存タスク**: TASK-0009
- **要件リンク**: NFR-301（キーボード操作）、NFR-202（直感的操作性）
- **要件名**: キーボード操作・スクリーンリーダー対応の確認と調整

#### 実装詳細

**確認項目**:

1. **キーボード操作** (NFR-301):
   - Tab キーでフォーカスが「次の質問へ！」ボタンに移動する
   - Enter / Space キーで `nextQuestion()` が発火する
   - フォーカスリングが視覚的に確認できる

2. **スクリーンリーダー対応**:
   - 質問が切り替わる際に `aria-live="polite"` で変更が通知される
   - ボタンに適切な `aria-label` が設定されている
   - 履歴セクションに `aria-label` が設定されている

3. **コントラスト比**:
   - テキストと背景のコントラスト比が 4.5:1 以上（WCAG AA 基準）
   - Chrome DevTools の Accessibility ツールで確認

**調整が必要な場合の対応**:
- `aria-live="polite"` を質問表示コンテナに追加
- ボタンに `aria-label="次の質問を表示する"` を追加
- フォーカスリングが見えない場合は `focus:ring-4 focus:ring-offset-2` を追加

#### 完了条件

- [ ] Tab キーでボタンにフォーカスが当たる
- [ ] Enter / Space キーでボタンが動作する
- [ ] フォーカスリングが視覚的に確認できる
- [ ] 質問カードに `aria-live` 属性が設定されている
- [ ] Chrome Lighthouse の Accessibility スコアが 80 以上

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — キーボード操作テスト・aria 属性追加
2. `/tsumiki:direct-verify` — Lighthouse Accessibility 計測・スコア確認

---

### ✅ TASK-0012: GitHub リポジトリ整備

- **タスクタイプ**: DIRECT
- **推定工数**: 1時間
- **依存タスク**: TASK-0010、TASK-0011
- **要件リンク**: REQ-401（Vercel無料デプロイ）
- **要件名**: Vercel 連携のための GitHub リポジトリ整備

#### 実装詳細

1. **`.gitignore` 確認**:
   - `node_modules/` が含まれていることを確認
   - `.env.local` 等が含まれていることを確認（今回は不要だが念のため）
   - `create-next-app` が生成したデフォルトで問題なし

2. **`README.md` 作成**:
   ```markdown
   # アイスブレイクツール

   オンライン会議を盛り上げるアイスブレイクツールです。

   ## 機能
   - ランダムなアイスブレイク質問を表示
   - 表示した質問の履歴を一覧表示

   ## 技術スタック
   - Next.js 14 / TypeScript / Tailwind CSS
   - Vercel でホスティング

   ## 開発
   npm install
   npm run dev
   ```

3. **最終コミット**:
   - 全ファイルをステージング・コミット
   - コミットメッセージ: `feat: implement ice breaker tool`

4. **GitHub へのプッシュ**:
   - GitHub でリポジトリ作成（Public）
   - `git remote add origin` でリモートを設定
   - `git push -u origin main`

#### 完了条件

- [ ] `README.md` が作成されている
- [ ] `.gitignore` に `node_modules/` が含まれている
- [ ] 全変更がコミット済み
- [ ] GitHub リポジトリにプッシュ済み
- [ ] GitHub 上でコードが閲覧できる

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — README 作成・コミット・GitHub プッシュ
2. `/tsumiki:direct-verify` — GitHub 上でリポジトリの内容を確認

---

### ✅ TASK-0013: Vercel デプロイ設定

- **タスクタイプ**: DIRECT
- **推定工数**: 2時間
- **依存タスク**: TASK-0012
- **要件リンク**: REQ-401（Vercel無料プラン）
- **要件名**: Vercel への初回デプロイと自動デプロイ設定

#### 実装詳細

**手順**:

1. **Vercel アカウント準備**:
   - [vercel.com](https://vercel.com) でアカウント作成（GitHub アカウントでログイン推奨）
   - 無料プラン（Hobby）を選択

2. **プロジェクトのインポート**:
   - Vercel ダッシュボード → "Add New Project"
   - GitHub リポジトリ（iceBlakeTool）を選択
   - フレームワーク: Next.js（自動検出される）
   - ビルドコマンド: `npm run build`（デフォルト）
   - 出力ディレクトリ: `.next`（デフォルト）
   - 環境変数: なし

3. **初回デプロイ実行**:
   - "Deploy" ボタンをクリック
   - ビルドログを確認し、エラーがないことを確認

4. **デプロイ確認**:
   - 発行された URL（`https://{project-name}.vercel.app`）にアクセス
   - 本番環境でアプリが正常動作することを確認

5. **自動デプロイ確認**:
   - `main` ブランチへの push が自動デプロイになっていることを確認

#### 完了条件

- [ ] Vercel にプロジェクトが作成されている
- [ ] 初回デプロイが成功している（ビルドエラーなし）
- [ ] `https://{project-name}.vercel.app` でアプリが表示される
- [ ] `main` ブランチ push で自動デプロイが走る設定になっている

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — Vercel プロジェクト作成・デプロイ実行
2. `/tsumiki:direct-verify` — 本番 URL でアプリの表示を確認

---

### ✅ TASK-0014: 受け入れテスト実施

- **タスクタイプ**: DIRECT
- **推定工数**: 2時間
- **依存タスク**: TASK-0013
- **要件リンク**: 全要件（REQ-001〜EDGE-101）
- **要件名**: 本番環境での受け入れテスト実施・品質最終確認

#### 実装詳細

`docs/spec/icebreak-acceptance-criteria.md` のチェックリストを本番 URL で実施する。

**実施手順**:

1. **機能テスト（本番 URL）**:
   - REQ-001: ページを開くと質問が1問表示されることを確認
   - REQ-101: 「次の質問へ！」ボタンで質問が切り替わることを確認
   - REQ-003/102: ボタン押下後に履歴が追加されることを確認
   - REQ-004: ポップ・カラフルなデザインになっていることを確認
   - EDGE-101: 繰り返し押しても正常動作することを確認

2. **レスポンシブテスト（本番 URL）**:
   - スマートフォン実機（または Chrome DevTools）で確認
   - PC ブラウザで確認

3. **Lighthouse 計測**（Chrome DevTools）:
   - Performance: 70以上
   - Accessibility: 80以上
   - Best Practices: 80以上
   - SEO: 70以上

4. **画面共有テスト**（オプション）:
   - Zoom などで実際に画面共有し、参加者目線での見やすさを確認

**発見した問題への対応**:
- 軽微な問題（スタイル調整等）: 修正して `main` に push → 自動デプロイ
- 重大な問題: 原因調査後、対応 PR を作成

#### 完了条件

- [ ] `docs/spec/icebreak-acceptance-criteria.md` の全機能テストが通る
- [ ] スマートフォン・PCで正常表示される
- [ ] Lighthouse Performance スコアが 70 以上
- [ ] Lighthouse Accessibility スコアが 80 以上
- [ ] 本番 URL が永続的に表示される

#### DIRECTプロセス

1. `/tsumiki:direct-setup` — 受け入れ基準チェックリストを本番 URL で実施
2. `/tsumiki:direct-verify` — Lighthouse 計測・全チェック項目の確認

---

## Phase 3 完了条件（マイルストーン M3）

- [ ] `https://{project-name}.vercel.app` でアプリが公開されている
- [ ] `main` ブランチ push で自動デプロイが動作する
- [ ] 受け入れテストの全チェック項目が通っている
- [ ] Lighthouse Performance 70以上 / Accessibility 80以上

**🎉 Phase 3 完了 = プロジェクト完了！**

---

## デプロイ後の運用メモ

| 項目 | 内容 |
|------|------|
| URL | `https://{project-name}.vercel.app` |
| 自動デプロイ | `main` ブランチへの push で自動更新 |
| 質問の追加 | `src/data/questions.ts` を編集して push |
| 無料プラン制限 | 商用利用は Vercel 利用規約を確認 |

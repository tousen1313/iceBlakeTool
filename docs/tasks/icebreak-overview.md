# アイスブレイクツール タスク概要

## プロジェクト概要

| 項目 | 内容 |
|------|------|
| プロジェクト名 | アイスブレイクツール（iceBlakeTool） |
| 総工数 | 約34時間（4〜5日） |
| 総タスク数 | 14タスク |
| フェーズ数 | 3フェーズ |
| 技術スタック | Next.js 14 / TypeScript / Tailwind CSS / Vercel |

---

## フェーズ構成

| フェーズ | 名称 | レイヤー | タスク数 | 工数 | ファイル |
|----------|------|----------|----------|------|----------|
| Phase 1 | 環境構築・データ層 | 基盤・静的データ | 4 | 7h | [icebreak-phase1.md](icebreak-phase1.md) |
| Phase 2 | ロジック層・UI層実装 | カスタムフック・コンポーネント | 5 | 18h | [icebreak-phase2.md](icebreak-phase2.md) |
| Phase 3 | 品質確認・デプロイ | QA・インフラ | 5 | 9h | [icebreak-phase3.md](icebreak-phase3.md) |

---

## マイルストーン

| マイルストーン | 条件 | 関連フェーズ |
|----------------|------|-------------|
| M1: 開発環境完成 | Next.js が起動し、型定義・質問データが揃っている | Phase 1 完了 |
| M2: 機能完成 | 全コンポーネントが動作し、ローカルで受け入れ基準を満たす | Phase 2 完了 |
| M3: 本番公開 | Vercel にデプロイ済み・受け入れテスト全件通過 | Phase 3 完了 |

---

## タスク番号管理

| 項目 | 内容 |
|------|------|
| 使用済み番号 | なし（新規プロジェクト） |
| Phase 1 割当 | TASK-0001 〜 TASK-0004 |
| Phase 2 割当 | TASK-0005 〜 TASK-0009 |
| Phase 3 割当 | TASK-0010 〜 TASK-0014 |
| 次回開始番号 | TASK-0015 |

---

## 全体進捗チェックリスト

### Phase 1: 環境構築・データ層

- [ ] TASK-0001: Next.js プロジェクト初期化
- [ ] TASK-0002: TypeScript 型定義ファイル作成
- [ ] TASK-0003: Tailwind CSS 設定・グローバルスタイル
- [ ] TASK-0004: 質問プールデータ作成

### Phase 2: ロジック層・UI層実装

- [ ] TASK-0005: useIceBreak カスタムフック実装
- [ ] TASK-0006: QuestionCard コンポーネント実装
- [ ] TASK-0007: NextButton コンポーネント実装
- [ ] TASK-0008: HistoryList コンポーネント実装
- [ ] TASK-0009: メインページ統合

### Phase 3: 品質確認・デプロイ

- [ ] TASK-0010: レスポンシブデザイン確認・調整
- [ ] TASK-0011: アクセシビリティ確認・調整
- [ ] TASK-0012: GitHub リポジトリ整備
- [ ] TASK-0013: Vercel デプロイ設定
- [ ] TASK-0014: 受け入れテスト実施

---

## 依存関係マップ

```
TASK-0001（Next.js初期化）
    ├── TASK-0002（型定義）
    ├── TASK-0003（Tailwind設定）
    └── TASK-0004（質問データ）
           ↓（全て完了後）
    TASK-0005（useIceBreakフック）
    ├── TASK-0006（QuestionCard）
    ├── TASK-0007（NextButton）
    └── TASK-0008（HistoryList）
           ↓（全て完了後）
    TASK-0009（メインページ統合）
           ↓
    TASK-0010（レスポンシブ確認）
    TASK-0011（アクセシビリティ確認）
    TASK-0012（GitHub整備）
           ↓（全て完了後）
    TASK-0013（Vercelデプロイ）
           ↓
    TASK-0014（受け入れテスト）
```

---

## 関連文書

- **要件定義書**: [docs/spec/icebreak-requirements.md](../spec/icebreak-requirements.md)
- **ユーザストーリー**: [docs/spec/icebreak-user-stories.md](../spec/icebreak-user-stories.md)
- **受け入れ基準**: [docs/spec/icebreak-acceptance-criteria.md](../spec/icebreak-acceptance-criteria.md)
- **アーキテクチャ設計**: [docs/design/icebreak/architecture.md](../design/icebreak/architecture.md)
- **データフロー**: [docs/design/icebreak/dataflow.md](../design/icebreak/dataflow.md)
- **型定義**: [docs/design/icebreak/interfaces.ts](../design/icebreak/interfaces.ts)

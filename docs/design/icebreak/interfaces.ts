/**
 * アイスブレイクツール TypeScript型定義
 *
 * 【信頼性レベル凡例】
 * 🔵 青信号: 要件定義書・技術スタックを参考にしてほぼ推測していない場合
 * 🟡 黄信号: 要件定義書・技術スタックから妥当な推測の場合
 * 🔴 赤信号: 要件定義書・技術スタックにない推測の場合
 */

// ============================================================
// エンティティ定義
// ============================================================

/**
 * 質問エンティティ
 * 🔵 REQ-001（質問表示）・REQ-002（質問プール）より
 */
export interface Question {
  /** 質問の一意識別子 */
  id: number;
  /** 質問文（日本語） */
  text: string;
  /** 質問カテゴリ（ユーモア・軽い系） */
  category: QuestionCategory;
}

/**
 * 質問カテゴリ
 * 🔵 ユーザヒアリング（ユーモア・軽い系）より
 */
export type QuestionCategory = "humor" | "light";

// ============================================================
// 状態定義
// ============================================================

/**
 * アイスブレイクアプリの状態
 * 🟡 React カスタムフック設計から妥当な推測
 */
export interface IceBreakState {
  /** 現在表示中の質問 */
  currentQuestion: Question;
  /** 表示済み質問の履歴（古い順） */
  history: Question[];
  /** 現在何問目か（1始まり） */
  questionNumber: number;
}

/**
 * useIceBreak カスタムフックの戻り値
 * 🟡 React カスタムフック設計から妥当な推測
 */
export interface UseIceBreakReturn extends IceBreakState {
  /** 次のランダム質問を表示する（現在の質問を履歴に追加） */
  nextQuestion: () => void;
}

// ============================================================
// コンポーネント Props 定義
// ============================================================

/**
 * QuestionCard コンポーネントの Props
 * 🟡 コンポーネント設計から妥当な推測
 */
export interface QuestionCardProps {
  /** 表示する質問 */
  question: Question;
  /** 何問目か */
  questionNumber: number;
}

/**
 * NextButton コンポーネントの Props
 * 🟡 コンポーネント設計から妥当な推測
 */
export interface NextButtonProps {
  /** ボタンクリック時のコールバック */
  onClick: () => void;
  /** ボタンが無効化されているか（質問プールが空の場合） */
  disabled?: boolean;
}

/**
 * HistoryList コンポーネントの Props
 * 🔵 REQ-003（履歴表示）より
 */
export interface HistoryListProps {
  /** 表示する履歴 */
  history: Question[];
}

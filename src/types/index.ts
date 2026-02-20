// ============================================================
// エンティティ定義
// ============================================================

/**
 * 質問カテゴリ
 * ユーモア・軽い系
 */
export type QuestionCategory = "humor" | "light";

/**
 * 質問エンティティ
 */
export interface Question {
  id: number;
  text: string;
  category: QuestionCategory;
}

// ============================================================
// 状態定義
// ============================================================

/**
 * アイスブレイクアプリの状態
 */
export interface IceBreakState {
  currentQuestion: Question;
  history: Question[];
  questionNumber: number;
}

/**
 * useIceBreak カスタムフックの戻り値
 */
export interface UseIceBreakReturn extends IceBreakState {
  nextQuestion: () => void;
}

// ============================================================
// コンポーネント Props 定義
// ============================================================

export interface QuestionCardProps {
  question: Question;
  questionNumber: number;
}

export interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export interface HistoryListProps {
  history: Question[];
}

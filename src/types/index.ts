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
  isStarted: boolean;
  isAnimating: boolean;
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
  isAnimating?: boolean;
}

export interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

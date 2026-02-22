export type QuestionCategory = "humor" | "light";

export interface Question {
  id: number;
  text: string;
  category: QuestionCategory;
}

export interface IceBreakState {
  currentQuestion: Question;
  isStarted: boolean;
  isAnimating: boolean;
}

export interface UseIceBreakReturn extends IceBreakState {
  nextQuestion: () => void;
}

export interface QuestionCardProps {
  question: Question;
  isAnimating?: boolean;
}

export interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

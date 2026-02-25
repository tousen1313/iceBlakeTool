export interface Question {
  id: number;
  text: string;
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

export interface Question {
  id: number;
  text: string;
}

export interface UseIceBreakReturn {
  currentQuestions: Question[];
  isStarted: boolean;
  isAnimating: boolean;
  nextQuestion: () => void;
}

export interface QuestionCardProps {
  questions: Question[];
  isAnimating?: boolean;
}

export interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

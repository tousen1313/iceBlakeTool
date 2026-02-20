import { QuestionCardProps } from "@/types";

export function QuestionCard({ question, questionNumber }: QuestionCardProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-purple-300">
      <p className="text-sm text-gray-400 mb-4 font-bold tracking-widest">
        Q.{questionNumber}
      </p>
      <p
        className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 text-center leading-relaxed"
        aria-live="polite"
      >
        {question.text}
      </p>
    </div>
  );
}

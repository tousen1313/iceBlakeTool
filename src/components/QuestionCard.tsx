import { QuestionCardProps } from "@/types";

export function QuestionCard({ question, isAnimating = false }: QuestionCardProps) {
  return (
    <div
      className={`max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 flex items-center justify-center transition-colors duration-75
        ${isAnimating ? "h-[180px] overflow-hidden" : "min-h-[180px]"}
        ${isAnimating ? "border-sky-200" : "border-purple-300"}`}
    >
      <p
        className={`text-xl md:text-2xl lg:text-3xl font-bold text-center leading-loose transition-colors duration-75
          ${isAnimating ? "text-sky-400 animate-drumroll" : "text-gray-800"}`}
        aria-live={isAnimating ? "off" : "polite"}
      >
        {question.text}
      </p>
    </div>
  );
}

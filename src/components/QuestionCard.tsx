import { QuestionCardProps } from "@/types";

export function QuestionCard({ questions, isAnimating = false }: QuestionCardProps) {
  const isMultiple = questions.length > 1;

  return (
    <div
      className={`w-[1000px] bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 flex items-center justify-center transition-colors duration-75
        ${isAnimating ? "h-[300px] overflow-hidden" : "min-h-[300px]"}
        ${isAnimating ? "border-sky-200" : "border-purple-300"}`}
    >
      {isMultiple ? (
        <div className="w-full flex flex-col divide-y divide-purple-100">
          {questions.map((q, i) => (
            <p
              key={i}
              className={`py-5 text-lg md:text-xl lg:text-2xl font-bold text-center leading-relaxed transition-colors duration-75
                ${isAnimating ? "text-sky-300 animate-drumroll" : "text-sky-400"}`}
              aria-live={isAnimating ? "off" : "polite"}
            >
              {q.text}
            </p>
          ))}
        </div>
      ) : (
        <p
          className={`text-xl md:text-2xl lg:text-3xl font-bold text-center leading-loose transition-colors duration-75
            ${isAnimating ? "text-sky-300 animate-drumroll" : "text-sky-400"}`}
          aria-live={isAnimating ? "off" : "polite"}
        >
          {questions[0].text}
        </p>
      )}
    </div>
  );
}

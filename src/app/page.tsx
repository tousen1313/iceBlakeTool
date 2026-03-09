"use client";

import { useState } from "react";
import { useIceBreak } from "@/hooks/useIceBreak";
import { QuestionCard } from "@/components/QuestionCard";
import { NextButton } from "@/components/NextButton";
import { TodayFact } from "@/components/TodayFact";

export default function Home() {
  const [count, setCount] = useState<1 | 3>(1);
  const { currentQuestions, isStarted, isAnimating, nextQuestion } =
    useIceBreak(count);

  return (
    <main
      className="relative min-h-screen bg-[#f0f8ff] flex flex-col items-center justify-center px-4 py-8"
      aria-label="アイスブレイクツール"
    >
      <div className="fixed top-4 right-4">
        <TodayFact />
      </div>
      <h1 className="text-center text-7xl font-extrabold text-purple-600 mb-10 drop-shadow-sm">
        アイスブレイク
      </h1>

      {isStarted ? (
        <div className="flex flex-col gap-4 w-[1000px]">
          {currentQuestions.map((question, i) => (
            <QuestionCard key={i} question={question} isAnimating={isAnimating} />
          ))}
        </div>
      ) : (
        <div className="w-[1000px] min-h-[300px] bg-white/60 rounded-3xl shadow-xl p-8 md:p-12 border-4 border-dashed border-purple-200 flex items-center justify-center">
          <p className="text-gray-400 text-4xl font-medium">
            スタートを押してください
          </p>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 mt-8">
        <NextButton
          onClick={nextQuestion}
          disabled={isAnimating}
          label={isStarted ? "他の質問へ" : "スタート"}
        />
        <div className="flex gap-6">
          {([1, 3] as const).map((n) => (
            <label key={n} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="count"
                value={n}
                checked={count === n}
                onChange={() => setCount(n)}
                className="accent-purple-500 w-4 h-4"
              />
              <span className="text-gray-500 font-medium">{n}問</span>
            </label>
          ))}
        </div>
      </div>
    </main>
  );
}

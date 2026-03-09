"use client";

import { useState } from "react";
import { useIceBreak } from "@/hooks/useIceBreak";
import { QuestionCard } from "@/components/QuestionCard";
import { NextButton } from "@/components/NextButton";
import { TodayFact } from "@/components/TodayFact";
import { ReleaseNotes } from "@/components/ReleaseNotes";

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
      <ReleaseNotes />
      <h1 className="text-center text-7xl font-extrabold text-purple-600 mb-10 drop-shadow-sm">
        アイスブレイク
      </h1>

      {isStarted ? (
        <QuestionCard questions={currentQuestions} isAnimating={isAnimating} />
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
        <div className="flex w-[290px] items-center gap-3">
          <span className="text-base font-semibold text-purple-400 tracking-wide">
            質問数
          </span>
          <div className="flex gap-4 bg-white/70 rounded-full p-1 shadow-inner border border-purple-100">
            {([1, 3] as const).map((n) => (
              <label key={n} className="cursor-pointer">
                <input
                  type="radio"
                  name="count"
                  value={n}
                  checked={count === n}
                  onChange={() => setCount(n)}
                  className="sr-only"
                />
                <span
                  className={`block px-6 py-2 rounded-full text-sm font-bold transition-all duration-200
                    ${
                      count === n
                        ? "bg-gradient-to-r from-sky-300 to-blue-400 text-white shadow-md"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {n}問
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useIceBreak } from "@/hooks/useIceBreak";
import { QuestionCard } from "@/components/QuestionCard";
import { NextButton } from "@/components/NextButton";

export default function Home() {
  const { currentQuestion, isStarted, isAnimating, nextQuestion } = useIceBreak();

  return (
    <main
      className="min-h-screen bg-[#f0f8ff] py-12 px-4"
      aria-label="アイスブレイクツール"
    >
      <h1 className="text-center text-3xl md:text-4xl font-extrabold text-purple-600 mb-10 drop-shadow-sm">
        アイスブレイク
      </h1>

      {isStarted ? (
        <QuestionCard question={currentQuestion} isAnimating={isAnimating} />
      ) : (
        <div className="max-w-2xl mx-auto bg-white/60 rounded-3xl shadow-xl p-8 md:p-12 border-4 border-dashed border-purple-200 flex items-center justify-center h-[180px]">
          <p className="text-gray-400 text-lg font-medium">スタートを押してください</p>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <NextButton
          onClick={nextQuestion}
          disabled={isAnimating}
          label={isStarted ? "他の質問へ" : "スタート"}
        />
      </div>
    </main>
  );
}

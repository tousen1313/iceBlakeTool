"use client";

import { useIceBreak } from "@/hooks/useIceBreak";
import { QuestionCard } from "@/components/QuestionCard";
import { NextButton } from "@/components/NextButton";
import { TodayFact } from "@/components/TodayFact";
import { ReleaseNotes } from "@/components/ReleaseNotes";
import { RequestModal } from "@/components/RequestModal";

export default function Home() {
  const { currentQuestions, isStarted, isAnimating, nextQuestion } =
    useIceBreak(3);

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
        <div className="w-[1000px] min-h-[300px] bg-white/60 rounded-3xl shadow-xl p-8 md:p-12 border-4 border-dashed border-purple-200 flex flex-col items-center justify-center gap-2">
          <p className="text-gray-400 text-4xl font-medium">
            スタートを押してください
          </p>
          <p className="text-gray-300 text-base">
            ランダムな3問が表示されます
          </p>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 mt-8">
        <NextButton
          onClick={nextQuestion}
          disabled={isAnimating}
          label={isStarted ? "他の質問へ" : "スタート"}
        />
        <RequestModal />
      </div>
    </main>
  );
}

"use client";

import { useIceBreak } from "@/hooks/useIceBreak";
import { QuestionCard } from "@/components/QuestionCard";
import { NextButton } from "@/components/NextButton";
import { HistoryList } from "@/components/HistoryList";

export default function Home() {
  const { currentQuestion, history, questionNumber, nextQuestion } =
    useIceBreak();

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 py-12 px-4"
      aria-label="アイスブレイクツール"
    >
      <h1 className="text-center text-3xl md:text-4xl font-extrabold text-purple-600 mb-10 drop-shadow-sm">
        🎉 アイスブレイクタイム！
      </h1>

      <QuestionCard question={currentQuestion} questionNumber={questionNumber} />

      <div className="flex justify-center mt-8">
        <NextButton onClick={nextQuestion} />
      </div>

      <div className="max-w-2xl mx-auto mt-12">
        <HistoryList history={history} />
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import vegetableQuizData from "@/data/vegetable-fruit-kanji-quiz.json";

function getRandomQuiz() {
  return vegetableQuizData[
    Math.floor(Math.random() * vegetableQuizData.length)
  ];
}

export function VegetableQuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [quiz] = useState(getRandomQuiz);

  const handleOpen = () => {
    setIsRevealed(false);
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-16 right-4 hidden md:flex items-center justify-center px-3 h-10 rounded-full bg-white/80 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-green-100"
        aria-label="野菜果物漢字クイズ"
      >
        <span className="text-sm font-bold text-green-600">
          野菜果物漢字クイズ
        </span>
      </button>

      {isOpen && (
        <Modal title="今日の野菜・果物クイズ" onClose={() => setIsOpen(false)}>
          <div className="flex flex-col items-center gap-6 py-2">
            <p className="text-8xl font-bold text-green-600 leading-none tracking-widest">
              {quiz.kanji}
            </p>
            {!isRevealed ? (
              <button
                onClick={() => setIsRevealed(true)}
                className="px-8 py-2 bg-gradient-to-r from-lime-300 to-green-400 text-white font-bold rounded-full shadow hover:scale-105 transition-transform duration-200"
              >
                答えを見る
              </button>
            ) : (
              <div className="w-full text-center space-y-3">
                <p className="text-3xl font-bold text-green-500">{quiz.answer}</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {quiz.trivia}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

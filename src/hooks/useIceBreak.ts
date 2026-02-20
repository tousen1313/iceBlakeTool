"use client";

import { useState, useCallback } from "react";
import { Question, UseIceBreakReturn } from "@/types";
import { questions } from "@/data/questions";

function getRandomQuestion(): Question {
  const index = Math.floor(Math.random() * questions.length);
  return questions[index];
}

export function useIceBreak(): UseIceBreakReturn {
  const [isStarted, setIsStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() =>
    getRandomQuestion()
  );

  const nextQuestion = useCallback(() => {
    const finalQuestion = getRandomQuestion();
    setIsStarted(true);
    setIsAnimating(true);

    // ドラムロール: 50ms 一定間隔で0.7秒間切り替え
    const intervalMs = 50;
    const totalMs = 700;

    const timer = setInterval(() => {
      setCurrentQuestion(getRandomQuestion());
    }, intervalMs);

    setTimeout(() => {
      clearInterval(timer);
      setCurrentQuestion(finalQuestion);
      setIsAnimating(false);
    }, totalMs);
  }, []);

  return { currentQuestion, isStarted, isAnimating, nextQuestion };
}

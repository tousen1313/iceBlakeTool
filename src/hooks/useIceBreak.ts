"use client";

import { useState, useCallback, useRef } from "react";
import { Question, UseIceBreakReturn } from "@/types";
import { questions } from "@/data/questions";

function shuffle(array: Question[]): Question[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomQuestion(): Question {
  return questions[Math.floor(Math.random() * questions.length)];
}

export function useIceBreak(count: number = 1): UseIceBreakReturn {
  const [isStarted, setIsStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(() =>
    [getRandomQuestion()]
  );
  const queueRef = useRef<Question[]>(shuffle(questions));

  const nextQuestion = useCallback(() => {
    if (queueRef.current.length < count) {
      queueRef.current = shuffle(questions);
    }
    const finalQuestions = queueRef.current.slice(0, count);
    queueRef.current = queueRef.current.slice(count);

    setIsStarted(true);
    setIsAnimating(true);

    // ドラムロール: 50ms 一定間隔で0.7秒間切り替え
    const intervalMs = 50;
    const totalMs = 700;

    const timer = setInterval(() => {
      setCurrentQuestions(
        Array.from({ length: count }, () => getRandomQuestion())
      );
    }, intervalMs);

    setTimeout(() => {
      clearInterval(timer);
      setCurrentQuestions(finalQuestions);
      setIsAnimating(false);
    }, totalMs);
  }, [count]);

  return { currentQuestions, isStarted, isAnimating, nextQuestion };
}

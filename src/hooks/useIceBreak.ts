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

export function useIceBreak(count: number): UseIceBreakReturn {
  const [isStarted, setIsStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(() =>
    shuffle(questions).slice(0, count)
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

    const intervalMs = 50;
    const totalMs = 700;

    const timer = setInterval(() => {
      setCurrentQuestions(
        Array.from({ length: count }, () => questions[Math.floor(Math.random() * questions.length)])
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

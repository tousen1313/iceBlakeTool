"use client";

import { useState, useCallback, useRef } from "react";
import { Question, UseIceBreakReturn } from "@/types";
import { questions } from "@/data/questions";
import { shuffle } from "@/lib/shuffle";

const ANIMATION_INTERVAL_MS = 50;
const ANIMATION_TOTAL_MS = 700;

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

    const timer = setInterval(() => {
      setCurrentQuestions(
        Array.from({ length: count }, () => questions[Math.floor(Math.random() * questions.length)])
      );
    }, ANIMATION_INTERVAL_MS);

    setTimeout(() => {
      clearInterval(timer);
      setCurrentQuestions(finalQuestions);
      setIsAnimating(false);
    }, ANIMATION_TOTAL_MS);
  }, [count]);

  return { currentQuestions, isStarted, isAnimating, nextQuestion };
}

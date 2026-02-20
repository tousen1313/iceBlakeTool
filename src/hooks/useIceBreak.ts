"use client";

import { useState, useCallback } from "react";
import { Question, UseIceBreakReturn } from "@/types";
import { questions } from "@/data/questions";

function getRandomQuestion(): Question {
  const index = Math.floor(Math.random() * questions.length);
  return questions[index];
}

export function useIceBreak(): UseIceBreakReturn {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() =>
    getRandomQuestion()
  );
  const [history, setHistory] = useState<Question[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(1);

  const nextQuestion = useCallback(() => {
    setHistory((prev) => [...prev, currentQuestion]);
    setCurrentQuestion(getRandomQuestion());
    setQuestionNumber((prev) => prev + 1);
  }, [currentQuestion]);

  return { currentQuestion, history, questionNumber, nextQuestion };
}

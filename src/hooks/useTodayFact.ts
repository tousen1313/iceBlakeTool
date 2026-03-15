"use client";

import { useState, useEffect } from "react";

interface TodayFactState {
  facts: string[];
  isLoading: boolean;
  error: boolean;
}

export function useTodayFact(): TodayFactState {
  const [facts, setFacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/today-facts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setFacts(data.facts);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return { facts, isLoading, error };
}

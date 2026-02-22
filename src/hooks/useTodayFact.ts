"use client";

import { useState, useEffect } from "react";

interface TodayFactState {
  facts: string[];
  isLoading: boolean;
  error: boolean;
}

function stripWikiMarkup(text: string): string {
  return text
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, "$1")
    .replace(/'{2,3}([^']+)'{2,3}/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\{\{[^}]*\}\}/g, "")
    .replace(/[（(]\s*[）)]/g, "")
    .trim();
}

export function useTodayFact(): TodayFactState {
  const [facts, setFacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const title = encodeURIComponent(`${month}月${day}日`);

    fetch(
      `https://ja.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=revisions&titles=${title}&rvprop=content`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const pages = data.query?.pages;
        if (!pages) throw new Error("No pages");

        const page = Object.values(pages)[0] as {
          revisions?: Array<Record<string, string>>;
        };
        const content = page.revisions?.[0]?.["*"];
        if (!content) throw new Error("No content");

        // 「記念日・年中行事」セクションを抽出
        const sectionMatch = content.match(
          /==\s*記念日.?年中行事\s*==([\s\S]*?)(?:==\s*[^=]|$)/,
        );
        const section = sectionMatch?.[1] ?? "";

        // 箇条書き行を抽出（{{JPN}} がついた日本の記念日に絞る）
        const allLines = section
          .split("\n")
          .filter((line) => /^\*\s/.test(line));

        const jpnLines = allLines.filter((line) => line.includes("JPN"));
        const eventLines = jpnLines.length > 0 ? jpnLines : allLines;

        if (eventLines.length === 0) throw new Error("No events");

        // シャッフルして最大5件取得
        const shuffled = [...eventLines].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 5).map((line) =>
          stripWikiMarkup(line.replace(/^\*+\s*/, ""))
        );

        setFacts(selected);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return { facts, isLoading, error };
}

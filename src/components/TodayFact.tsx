"use client";

import { useTodayFact } from "@/hooks/useTodayFact";

export function TodayFact() {
  const { facts, isLoading, error } = useTodayFact();

  const today = new Date();
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <div className="w-[300px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-5 border border-purple-100">
      <p className="text-base font-bold text-purple-500 mb-3">
        📅 {dateStr}は何の日？
      </p>
      {isLoading && (
        <p className="text-sm text-gray-400">読み込み中...</p>
      )}
      {error && (
        <p className="text-sm text-gray-400">取得できませんでした</p>
      )}
      {facts.length > 0 && (
        <ul className="space-y-2">
          {facts.map((fact, i) => (
            <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-1.5">
              <span className="text-purple-300 shrink-0">・</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

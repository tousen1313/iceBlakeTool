import { HistoryListProps } from "@/types";

export function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <section aria-label="これまでの質問">
      <h2 className="text-lg font-bold text-gray-500 mb-3">📋 これまでの質問</h2>
      <ol className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((q, index) => (
          <li
            key={`${q.id}-${index}`}
            className="text-gray-600 text-sm bg-white/70 rounded-xl p-3 shadow-sm"
          >
            {index + 1}. {q.text}
          </li>
        ))}
      </ol>
    </section>
  );
}

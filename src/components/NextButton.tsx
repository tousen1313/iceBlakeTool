import { NextButtonProps } from "@/types";

export function NextButton({ onClick, disabled = false }: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="次の質問を表示する"
      className="px-10 py-5 bg-gradient-to-r from-pink-500 to-orange-400
                 text-white text-xl font-extrabold rounded-full shadow-lg
                 hover:scale-105 transition-transform duration-200
                 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
    >
      🎲 次の質問へ！
    </button>
  );
}

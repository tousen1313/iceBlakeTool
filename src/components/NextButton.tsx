import { NextButtonProps } from "@/types";

export function NextButton({ onClick, disabled = false, label }: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="px-10 py-5 bg-gradient-to-r from-sky-300 to-blue-400
                 text-white text-xl font-extrabold rounded-full shadow-lg
                 hover:scale-105 transition-transform duration-200
                 focus:outline-none focus:ring-4 focus:ring-sky-200 focus:ring-offset-2
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
    >
      {label}
    </button>
  );
}

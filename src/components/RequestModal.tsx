"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";

type Status = "idle" | "sending" | "done" | "error";

const MAX_LENGTH = 200;

export function RequestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const trimmed = text.trim();
  const isOverLimit = text.length > MAX_LENGTH;
  const isInvalid = trimmed.length === 0 || isOverLimit;

  const handleSubmit = async () => {
    if (isInvalid) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setText("");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStatus("idle");
    setText("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-purple-300 hover:text-purple-400 transition-colors duration-200"
      >
        質問をリクエスト
      </button>

      {isOpen && (
        <Modal title="質問をリクエスト" onClose={handleClose}>
          <p className="text-xs text-gray-400 -mt-4 mb-6">
            聞いてみたい質問があれば気軽にどうぞ！
          </p>

          {status === "done" ? (
            <p className="text-center text-gray-600 py-4 px-2 bg-[#f0f8ff] rounded-2xl">
              リクエストを送信しました！ありがとうございます
            </p>
          ) : (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="例：好きな食べ物は？"
                className={`w-full border rounded-2xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 h-32 transition-colors ${
                  isOverLimit
                    ? "border-red-300 focus:ring-red-200"
                    : "border-purple-200 focus:ring-purple-300"
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-red-400 text-sm">
                  {isOverLimit ? "200文字以内で入力してください。" : ""}
                </span>
                <span
                  className={`text-xs ${isOverLimit ? "text-red-400 font-bold" : "text-gray-400"}`}
                >
                  {text.length} / {MAX_LENGTH}
                </span>
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm mt-2">
                  送信に失敗しました。もう一度お試しください。
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={isInvalid || status === "sending"}
                className="mt-4 w-full py-3 bg-gradient-to-r from-sky-300 to-blue-400 text-white font-bold rounded-full shadow hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {status === "sending" ? "送信中..." : "送信する"}
              </button>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

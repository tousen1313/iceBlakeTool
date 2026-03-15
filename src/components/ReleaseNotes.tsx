"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/Modal";
import releaseNotes from "@/data/release-notes.json";

export function ReleaseNotes() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-purple-100"
        aria-label="リリースノートを表示"
      >
        <Image
          src="/release-notes.svg"
          alt="リリースノート"
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <Modal
          title="リリースノート"
          onClose={() => setIsOpen(false)}
          maxHeightClass="max-h-[80vh] overflow-y-auto"
        >
          <div className="space-y-6">
            {releaseNotes.map((note) => (
              <div key={note.date}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-white bg-purple-400 rounded-full px-3 py-1">
                    {note.date}
                  </span>
                </div>
                <ul className="space-y-1">
                  {note.changes.map((change, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-purple-300 shrink-0">・</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}

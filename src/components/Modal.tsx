"use client";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxHeightClass?: string;
}

export function Modal({ title, onClose, children, maxHeightClass = "" }: ModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 ${maxHeightClass}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-purple-600">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

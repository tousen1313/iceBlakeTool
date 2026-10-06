"use client";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxHeightClass?: string;
  maxWidthClass?: string;
  desktopOnly?: boolean;
}

export function Modal({ title, onClose, children, maxHeightClass = "", maxWidthClass = "max-w-md", desktopOnly = false }: ModalProps) {
  const desktopClass = desktopOnly ? "hidden md:block" : "";
  const desktopFlexClass = desktopOnly ? "hidden md:flex" : "flex";
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 ${desktopClass}`}
        onClick={onClose}
      />
      <div className={`fixed inset-0 z-50 items-center justify-center p-4 ${desktopFlexClass}`}>
        <div className={`bg-white rounded-3xl shadow-2xl w-full ${maxWidthClass} p-8 ${maxHeightClass}`}>
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

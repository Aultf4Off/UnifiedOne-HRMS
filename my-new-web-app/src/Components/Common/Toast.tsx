import React from 'react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-2xl border border-slate-700"
      role="status"
      aria-live="polite"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;

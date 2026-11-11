import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  isSuccess?: boolean;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  isSuccess = true,
  onClose,
}) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-md px-5 py-4 rounded-xl bg-[#2b2b2b] text-white flex items-center gap-3 shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-l-4 transition-all duration-300 animate-in slide-in-from-right-4 ${
        isSuccess ? 'border-l-[#4caf50]' : 'border-l-[#e63946]'
      }`}
      role="alert"
    >
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-[#4caf50] shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-[#e63946] shrink-0" />
      )}
      <span className="text-sm font-medium pr-2">{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-md text-neutral-400 hover:text-white transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

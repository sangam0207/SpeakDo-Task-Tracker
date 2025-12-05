import { useEffect } from "react";
import { Check, AlertCircle} from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

export default function Toast({ message, type }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
     
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const isSuccess = type === "success";
  const bgColor = isSuccess 
    ? "bg-gradient-to-r from-emerald-500 to-green-500" 
    : "bg-gradient-to-r from-red-500 to-rose-500";
  const Icon = isSuccess ? Check : AlertCircle;

  return (
    <div
      className={`fixed bottom-6 right-6 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 max-w-sm border border-opacity-20 border-white backdrop-blur-sm`}
      style={{
        animation: "slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="flex-shrink-0">
        <Icon className="w-5 h-5 flex-shrink-0" />
      </div>
      <span className="font-semibold text-sm flex-1">{message}</span>
      <style>{`
        @keyframes slideInUp {
          from {
            transform: translateY(120px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideOutDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(120px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
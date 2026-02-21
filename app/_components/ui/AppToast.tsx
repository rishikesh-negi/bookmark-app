import { CheckmarkFilled, CloseFilled } from "@carbon/icons-react";
import toast from "react-hot-toast";

type BookmarkCreatedToastProps = {
  isVisible: boolean;
  type: "success" | "fail";
  message: string;
  redirectPath?: string;
  toastId: string;
};

export default function AppToast({
  type = "success",
  message,
  toastId,
}: BookmarkCreatedToastProps) {
  const icon =
    type === "success" ? (
      <CheckmarkFilled size={20} className="text-green-500" />
    ) : (
      <CloseFilled size={20} className="text-red-500" />
    );

  return (
    <div
      className={`flex items-center gap-3 px-2.5 max-w-2xl bg-brand-800 text-lg text-slate-100 *:py-2 rounded-lg shadow-[0_1.5rem_1rem_rgba(0,0,0,0.1)] pointer-events-auto ring ${type === "success" ? "ring-brand-200" : "ring-red-400"}`}>
      <span>{icon}</span>
      <p>{message}</p>
      <div className="h-full pl-3 flex items-center justify-center border-l border-brand-600">
        <button
          onClick={() => toast.dismiss(toastId)}
          className="w-4 h-4 border-brand-600 flex items-center justify-center rounded-full bg-brand-100 cursor-pointer">
          <span className="text-brand-700 text-xl">&times;</span>
        </button>
      </div>
    </div>
  );
}

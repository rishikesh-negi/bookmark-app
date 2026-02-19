import { use } from "react";
import { auth } from "../_lib/auth";

export default function UserProfileInfo() {
  const session = use(auth());

  return (
    <div className="w-full py-8 flex flex-col items-center gap-10 bg-brand-600/10">
      <div className="w-[80%] px-12 flex flex-col gap-2">
        <span className="text-xl font-semibold text-slate-700">Full name:</span>
        <span className="px-4 py-2 rounded-md border border-brand-500 bg-slate-100">
          {session?.user?.name}
        </span>
      </div>

      <div className="w-[80%] px-12 flex flex-col gap-2">
        <span className="text-xl font-semibold text-slate-700">Email:</span>
        <span className="px-4 py-2 rounded-md border border-brand-500 bg-slate-100">
          {session?.user?.email}
        </span>
      </div>
    </div>
  );
}

"use client";

import { Logout } from "@carbon/icons-react";
import { useSignOut } from "../hooks/useSignOut";
import SpinnerMini from "./ui/SpinnerMini";

export default function SignOutButton() {
  const { isPending, signOutAction } = useSignOut();

  return (
    <form action={signOutAction}>
      {isPending ? (
        <span className="w-full py-4 grid items-center justify-center bg-brand-200/20">
          <SpinnerMini />
        </span>
      ) : (
        <button
          className="w-full px-5 py-3 flex items-center gap-4 font-semibold text-slate-800 hover:bg-brand-200/40 transition-colors cursor-pointer disabled:hover:bg-none"
          disabled={isPending}>
          <Logout size={24} className="text-brand-600" />
          <span>Sign out</span>
        </button>
      )}
    </form>
  );
}

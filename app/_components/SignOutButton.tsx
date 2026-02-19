import { Logout } from "@carbon/icons-react";
import { signOutAction } from "../_lib/actions";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="w-full px-5 py-3 flex items-center gap-4 font-semibold text-slate-800 hover:bg-brand-200/40 transition-colors cursor-pointer">
        <Logout size={24} className="text-brand-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

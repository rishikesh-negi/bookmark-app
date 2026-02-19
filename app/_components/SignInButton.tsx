import Image from "next/image";
import { signInAction } from "../_lib/actions";

export default function SignInButton(
  this: unknown,
  { redirectTo }: { redirectTo?: string },
) {
  return (
    <form action={signInAction.bind(this, redirectTo)}>
      <button className="flex items-center gap-4 text-lg text-brand-800 cursor-pointer border border-brand-800 transition-all px-7 py-3 hover:bg-brand-800 hover:text-brand-50 hover:[&>img]:scale-105">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          className="rounded-full antialiased"
          alt="Google logo"
          height={24}
          width={24}
        />
        Google
      </button>
    </form>
  );
}

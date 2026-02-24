"use client";

import Image from "next/image";
import { useSignIn } from "../hooks/useSignIn";
import Spinner from "./ui/Spinner";

export default function SignInButton() {
  const { isLoading, signInAction } = useSignIn();

  return (
    <form action={signInAction}>
      {isLoading ? (
        <span>
          <Spinner />
        </span>
      ) : (
        <button
          className="flex items-center gap-4 text-lg text-brand-800 cursor-pointer border border-brand-800 transition-all px-7 py-3 hover:bg-brand-800 hover:text-brand-50 hover:[&>img]:scale-105"
          disabled={isLoading}>
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            className="rounded-full antialiased"
            alt="Google logo"
            height={24}
            width={24}
          />
          Sign in with Google
        </button>
      )}
    </form>
  );
}

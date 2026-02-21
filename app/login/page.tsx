import { use } from "react";
import SignInButton from "../_components/SignInButton";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  const session = use(auth());
  if (session) return redirect("/account/profile");

  return (
    <div className="flex flex-col mt-10 gap-10 items-center">
      <h2 className="text-3xl font-bold">
        Sign in with Google to access your bookmarks
      </h2>
      <SignInButton />
    </div>
  );
}

import { Suspense, use } from "react";
import SignInButton from "../_components/SignInButton";
import { redirect } from "next/navigation";
import { type Metadata } from "next";
import { getSessionUser } from "../_lib/actions";
import Spinner from "../_components/ui/Spinner";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  const user = use(getSessionUser());
  if (user) return redirect("/account/profile");

  return (
    <div className="flex flex-col mt-10 gap-10 items-center">
      <h2 className="text-3xl font-bold">
        Sign in with Google to access your bookmarks
      </h2>
      <Suspense fallback={<Spinner />}>
        <SignInButton />
      </Suspense>
    </div>
  );
}

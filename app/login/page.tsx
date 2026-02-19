import { use } from "react";
import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = use(searchParams);

  return (
    <div className="flex flex-col mt-10 gap-10 items-center">
      <h2 className="text-3xl font-bold">
        Sign in with Google to access your bookmarks
      </h2>
      <SignInButton redirectTo={redirectTo} />
    </div>
  );
}

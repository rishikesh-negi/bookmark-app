import Image from "next/image";

import UserProfileInfo from "@/app/_components/UserProfileInfo";
import { useUserDataOnServer } from "@/app/hooks/useUserDataOnServer";
import logo from "@/public/logo.png";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
};

export default function Page() {
  const user = useUserDataOnServer();
  if (!user) redirect("/login");

  const firstName = user.user_metadata.name?.split(" ")[0];

  return (
    <div className="grid h-full">
      <div className="w-full h-full flex flex-col gap-12">
        <h1 className="text-3xl font-bold text-brand-600 block">
          Welcome, {firstName || "User"}
        </h1>
        <h2 className="text-3xl font-semibold text-slate-700">
          Use{" "}
          <span className="inline">
            <Image
              src={logo}
              width={180}
              height={60}
              className="inline-block px-3 py-2 bg-brand-600/20"
              alt="Logo of the Bookmark app"
            />{" "}
            to enhance your browsing experience
          </span>
        </h2>
        <UserProfileInfo />
      </div>
    </div>
  );
}

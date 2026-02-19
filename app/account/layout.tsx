import SideNavigation from "@/app/_components/SideNavigation";
import { use } from "react";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = use(auth());
  if (!session) return redirect("/login");

  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}

import SideNavigation from "@/app/_components/SideNavigation";
import { redirect } from "next/navigation";
import { useUserDataOnServer } from "../hooks/useUserDataOnServer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUserDataOnServer();
  if (!user) return redirect("/login");

  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}

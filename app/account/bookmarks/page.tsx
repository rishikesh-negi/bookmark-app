import BookmarksList from "@/app/_components/BookmarksList";
import CrossTabBookmarksSync from "@/app/_components/CrossTabBookmarksSync";
import Spinner from "@/app/_components/ui/Spinner";
import { getBookmarks } from "@/app/_lib/data-service";
import { useUserDataOnServer } from "@/app/hooks/useUserDataOnServer";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default function Page() {
  const user = useUserDataOnServer();
  if (!user) return redirect("/login");
  const bookmarks = use(getBookmarks(user.id));

  return (
    <>
      <CrossTabBookmarksSync />
      <BookmarksList bookmarks={bookmarks} />
    </>
  );
}

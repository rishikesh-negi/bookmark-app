import BookmarksList from "@/app/_components/BookmarksList";
import { auth, SessionWithUserId } from "@/app/_lib/auth";
import { getBookmarks } from "@/app/_lib/data-service";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { use } from "react";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default function Page() {
  const session = use(auth()) as SessionWithUserId;
  if (!session) return redirect("/login");
  const bookmarks = use(getBookmarks(session!.user.userId));

  return <BookmarksList bookmarks={bookmarks} />;
}

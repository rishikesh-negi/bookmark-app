import BookmarksList from "@/app/_components/BookmarksList";
import { auth, SessionWithUserId } from "@/app/_lib/auth";
import { getBookmarks } from "@/app/_lib/data-service";
import { use } from "react";

export default function Page() {
  const session = use(auth()) as SessionWithUserId;
  const bookmarks = use(getBookmarks(session!.user.userId));

  return <BookmarksList bookmarks={bookmarks} />;
}

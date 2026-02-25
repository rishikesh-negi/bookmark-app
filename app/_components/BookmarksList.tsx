"use client";

import { type FetchedBookmark } from "@/types/global.types";
import { useOptimistic } from "react";
import { deleteBookmark } from "../_lib/actions";
import AddBookmarkForm from "./AddBookmarkForm";
import Bookmark from "./Bookmark";
import ButtonOpenModal from "./ui/ButtonOpenModal";
import ModalProvider from "./ui/Modal";

export default function BookmarksList({
  bookmarks,
}: {
  bookmarks: FetchedBookmark[];
}) {
  const [optimisticBookmarks, optimisticDelete] = useOptimistic(
    bookmarks,
    (currentBookmarks, bookmarkId) =>
      currentBookmarks.length === 1
        ? []
        : currentBookmarks.filter((bookmark) => bookmark.id !== bookmarkId),
  );

  async function handleDelete(bookmarkId: number) {
    optimisticDelete(bookmarkId);
    await deleteBookmark(bookmarkId);
  }

  return bookmarks.length > 0 ? (
    <div className="flex flex-col gap-8">
      <ModalProvider modalContent={<AddBookmarkForm />}>
        <ButtonOpenModal buttonType="primary" label="Add a bookmark" />
      </ModalProvider>
      <h2 className="text-2xl font-semibold">Your bookmarks:</h2>
      <ul className="flex-1 w-260 max-h-[75%] space-y-6 overflow-y-scroll custom-scrollbar pb-2">
        {optimisticBookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <Bookmark
              bookmark={bookmark}
              onDelete={handleDelete}
              key={`bookmark-${bookmark.id}`}
            />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center mt-12 gap-8 justify-center">
      <h3 className="text-3xl font-semibold text-slate-700">
        You haven&apos;t added any bookmarks yet. Start by adding one!
      </h3>
      <ModalProvider modalContent={<AddBookmarkForm />}>
        <ButtonOpenModal buttonType="primary" label="Add a bookmark" />
      </ModalProvider>
    </div>
  );
}

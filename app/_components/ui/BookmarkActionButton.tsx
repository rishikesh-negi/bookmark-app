"use client";

import { FetchedBookmark } from "@/types/global.types";
import {
  MouseEventHandler,
  ReactElement,
  useTransition,
  type ComponentPropsWithoutRef,
} from "react";
import SpinnerMini from "./SpinnerMini";

type BookmarkActionButtonProps = ComponentPropsWithoutRef<"button"> & {
  icon: ReactElement;
  label: string;
  bookmark: FetchedBookmark;
  onDelete?: (bookmarkId: number) => void;
  buttonAction?: MouseEventHandler<unknown> | (() => void);
};

export default function BookmarkActionButton({
  icon,
  buttonAction,
  label,
  bookmark,
  onDelete,
  ...props
}: BookmarkActionButtonProps) {
  const [isPending, startTransition] = useTransition();

  async function deleteBookmark() {
    if (!onDelete) return;
    if (confirm("Are you sure you want to delete this bookmark?"))
      startTransition(() => onDelete(bookmark.id));
  }

  return (
    <button
      onClick={onDelete ? deleteBookmark : buttonAction}
      className="flex items-center gap-2 px-4 py-2 text-brand-600 cursor-pointer hover:bg-brand-600 hover:text-slate-200 transition-all"
      {...props}>
      {isPending ? (
        <SpinnerMini />
      ) : (
        <>
          <span>{icon}</span>
          <span className="uppercase text-xs font-semibold">{label}</span>
        </>
      )}
    </button>
  );
}

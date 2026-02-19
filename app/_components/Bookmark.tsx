import icon from "@/public/favicon.png";
import { FetchedBookmark } from "@/types/global.types";
import { Copy, Edit, Launch, TrashCan } from "@carbon/icons-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import EditBookmarkForm from "./EditBookmarkForm";
import AppToast from "./ui/AppToast";
import BookmarkActionButton from "./ui/BookmarkActionButton";
import BookmarkUrlUtilityButton from "./ui/BookmarkUrlUtilityButton";
import ButtonOpenModal from "./ui/ButtonOpenModal";
import ModalProvider from "./ui/Modal";

type BookmarkProps = {
  bookmark: FetchedBookmark;
  onDelete: (bookmarkId: number) => void;
};

export default function Bookmark({ bookmark, onDelete }: BookmarkProps) {
  const { id, title, url } = bookmark;
  const hostname = new URL(url).hostname;
  const bookmarkFavicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  const [faviconSrc, setFaviconSrc] = useState<string | StaticImageData>(
    bookmarkFavicon,
  );

  async function copyUrlToClipboard(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      toast.custom(
        (t) => (
          <AppToast
            isVisible={t.visible}
            type="success"
            message={"Link copied to clipboard!"}
            toastId={t.id}
          />
        ),
        { duration: 500 },
      );
    } catch (err) {
      console.error(err);
      toast.custom(
        (t) => (
          <AppToast
            isVisible={t.visible}
            type="fail"
            message="Something went wrong! Couldn't copy the link!"
            toastId={t.id}
          />
        ),
        { duration: 500 },
      );
    }
  }

  function openUrl(url: string) {
    const newTab = window.open(url, "_blank");
    if (newTab) newTab.focus();
  }

  return (
    <div className="h-fit w-[90%] flex *:bg-slate-50 *:border divide-x divide-slate-200">
      <figure className="relative w-10 h-10 aspect-square rounded-l-full">
        <Image
          src={faviconSrc}
          alt="Icon logo of a website"
          fill
          onError={() => setFaviconSrc(icon)}
          className="object-fill p-1 h-auto rounded-full"
        />
      </figure>

      <div
        className="px-4 py-2 flex-1 max-w-[75%] flex flex-col gap-2 rounded-bl-xl cursor-default"
        title={title}>
        <h4 className="text-xl font-semibold truncate">{title}</h4>
        <div className="w-full flex items-center justify-between">
          <p className="w-[85%] text-sm truncate">{url}</p>
          <div className="flex items-center gap-2">
            <BookmarkUrlUtilityButton
              icon={<Copy size={15} className="text-brand-600" />}
              onClick={() => copyUrlToClipboard(url)}
              title="Copy link"
            />
            <BookmarkUrlUtilityButton
              icon={<Launch size={15} className="text-brand-600" />}
              onClick={() => openUrl(url)}
              title="Open in new tab"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-slate-200 border-none">
        <ModalProvider modalContent={<EditBookmarkForm bookmark={bookmark} />}>
          <ButtonOpenModal
            buttonType="custom"
            CustomButton={
              <BookmarkActionButton
                bookmark={bookmark}
                icon={<Edit size={20} className="text-inherit" />}
                label="edit"
              />
            }
          />
        </ModalProvider>
        <BookmarkActionButton
          bookmark={bookmark}
          icon={<TrashCan size={20} className="text-inherit" />}
          label="delete"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

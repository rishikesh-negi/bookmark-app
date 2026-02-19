import { ComponentPropsWithoutRef, ReactElement } from "react";

type BookmarkUrlUtilityButton = ComponentPropsWithoutRef<"button"> & {
  icon: ReactElement;
};

export default function BookmarkUrlUtilityButton({
  icon,
  ...props
}: BookmarkUrlUtilityButton) {
  return (
    <button
      className="p-0.5 flex items-center justify-center rounded-sm border border-brand-100 bg-slate-200 hover:bg-slate-300 hover:border-brand-600 cursor-pointer"
      {...props}>
      {icon}
    </button>
  );
}

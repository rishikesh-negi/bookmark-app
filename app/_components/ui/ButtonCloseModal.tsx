import React, { ComponentPropsWithoutRef, MouseEventHandler } from "react";

type ButtonCloseModalProps = ComponentPropsWithoutRef<"button"> & {
  onClickFn?: MouseEventHandler<HTMLButtonElement>;
};

export default function ButtonCloseModal({
  onClickFn,
  ...props
}: ButtonCloseModalProps) {
  return (
    <button
      className="absolute top-4 right-4 aspect-square flex items-center justify-center w-6 h-6 rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.25)] text-2xl text-brand-600 cursor-pointer hover:bg-brand-600 hover:text-slate-200"
      onClick={onClickFn}
      {...props}>
      &times;
    </button>
  );
}

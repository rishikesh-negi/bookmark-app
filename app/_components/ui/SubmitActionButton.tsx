import { ComponentPropsWithoutRef, MouseEventHandler } from "react";
import { buttonStylePrimary } from "./Button";
import SpinnerMini from "./SpinnerMini";

type SubmitActionButtonProps = ComponentPropsWithoutRef<"button"> & {
  isPending: boolean;
  children: React.ReactNode;
  buttonText: string;
  onClickFn?: MouseEventHandler<unknown>;
};

export default function SubmitActionButton({
  isPending,
  children,
  buttonText,
  onClickFn = undefined,
  ...props
}: SubmitActionButtonProps) {
  return (
    <button
      className={`${buttonStylePrimary} relative self-start`}
      disabled={isPending}
      onClick={onClickFn}
      {...props}>
      <span className="invisible block">{buttonText}</span>
      <span className="absolute inset-0 flex items-center justify-center">
        {isPending ? <SpinnerMini /> : children}
      </span>
    </button>
  );
}

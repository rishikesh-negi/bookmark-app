import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: never;
  children: ReactNode;
  textOnly?: boolean;
};

export type LinkProps = ComponentPropsWithoutRef<typeof Link> & {
  href?: string;
  children: ReactNode;
  textOnly?: boolean;
};

function isLinkComponent(props: ButtonProps | LinkProps): props is LinkProps {
  return "href" in props;
}

export const buttonStylePrimary =
  "px-3 py-1 w-fit text-lg cursor-pointer rounded-md bg-brand-600 text-slate-200 hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300";

export const buttonStyleTextOnly =
  "w-fit text-lg cursor-pointer bg-none text-brand-700 hover:text-brand-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300";

export default function Button(props: ButtonProps | LinkProps) {
  return isLinkComponent(props) ? (
    <Link
      className={props.textOnly ? buttonStyleTextOnly : buttonStylePrimary}
      {...props}>
      {props.children}
    </Link>
  ) : (
    <button
      {...props}
      className={props.textOnly ? buttonStyleTextOnly : buttonStylePrimary}>
      {props.children}
    </button>
  );
}

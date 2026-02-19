import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
};

export default function Input({ label, ...props }: InputProps) {
  return (
    <p className="flex flex-col items-start w-full">
      <label htmlFor={props.id} className="text-lg text-slate-700 ml-1.5">
        {label}:
      </label>
      <input {...props} />
    </p>
  );
}

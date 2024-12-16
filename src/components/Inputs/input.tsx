import React from "react";
import { twMerge } from "tailwind-merge";

import type { UseFormRegister } from "react-hook-form";

export const Input = React.forwardRef<
  HTMLInputElement,
  {
    className?: string;
    label: string;
    error: string | undefined;
    type?: HTMLInputElement["type"];
    example?: string;
  } & ReturnType<UseFormRegister<Record<string, unknown>>>
>(({ onChange, onBlur, name, className, label, error, type, example }, ref) => (
  <div>
    <div className="flex flex-row items-center gap-1 ">
      <label
        htmlFor={name}
        className="ml-1 text-sm normal-case first-letter:capitalize"
      >
        {label}
      </label>
    </div>
    <input
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      id={name}
      className={twMerge(
        "border rounded-lg w-80 h-10 text-left text-md px-2 tracking-tight py-0  ",
        className,
      )}
      placeholder={`Enter your ${name}`}
    />
    <p className="my-1 ml-1 h-2 text-sm text-muted-foreground">{example}</p>
    <p className="ml-1 mt-3 h-2 normal-case text-red-500 first-letter:capitalize">
      {error}
    </p>
  </div>
));

Input.displayName = "Input";

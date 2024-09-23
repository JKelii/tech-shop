import React from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const Input = React.forwardRef<
  HTMLInputElement,
  {
    className?: string;
    label: string;
    error: string | undefined;
    type?: HTMLInputElement["type"];
  } & ReturnType<UseFormRegister<Record<string, unknown>>>
>(({ onChange, onBlur, name, className, label, error, type }, ref) => (
  <div>
    <div className="flex flex-row items-center gap-1 ">
      <label
        htmlFor={name}
        className="text-sm ml-1 normal-case first-letter:capitalize"
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
        className
      )}
      placeholder={`Enter your ${name}`}
    />

    <p className="text-red-500 h-2 normal-case first-letter:capitalize">
      {error}
    </p>
  </div>
));

Input.displayName = "Input";

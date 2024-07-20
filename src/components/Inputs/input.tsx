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
      <label htmlFor={name} className="text-sm ml-1">
        {label.toUpperCase().charAt(0) + label.slice(1)}
      </label>
    </div>
    <input
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      id={name}
      className={twMerge("py-2 border rounded-lg w-80 text-sm px-2", className)}
      placeholder={`Enter your ${name}`}
    />

    <p className="text-red-500 h-2">
      {error && error[0].toUpperCase() + error?.substring(1)}
    </p>
  </div>
));

Input.displayName = "Input";

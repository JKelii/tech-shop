import React from "react";
import { UseFormRegister } from "react-hook-form";

export const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    error: string | undefined;

    type?: HTMLInputElement["type"];
  } & ReturnType<UseFormRegister<Record<string, unknown>>>
>(({ onChange, onBlur, name, label, error, type }, ref) => (
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
      className="py-2 border rounded-lg w-72 text-sm px-2"
      placeholder={`Enter your ${name}`}
    />

    <p className="text-red-500">{error}</p>
  </div>
));

Input.displayName = "Input";

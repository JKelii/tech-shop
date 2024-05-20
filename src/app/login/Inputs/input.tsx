import React from "react";
import { UseFormRegister } from "react-hook-form";

export const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    error: string | undefined;
    icon: JSX.Element;
    type?: HTMLInputElement["type"];
  } & ReturnType<UseFormRegister<Record<string, unknown>>>
>(({ onChange, onBlur, name, label, error, icon, type }, ref) => (
  <div>
    <div className="flex flex-row items-center gap-1 ">
      {icon}
      <label htmlFor={name} className="text-sm">
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
      className="p-1 border rounded-lg w-72"
      placeholder={`Enter your ${name}`}
    />

    <p className="text-red-500">{error}</p>
  </div>
));

Input.displayName = "Input";

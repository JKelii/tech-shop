"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import { Input } from "./input";

import type { UseFormRegister } from "react-hook-form";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  { label: string; error: string | undefined } & ReturnType<
    UseFormRegister<Record<string, unknown>>
  >
>((inputProps, ref) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <div className="relative flex flex-col">
      <Input
        {...inputProps}
        ref={ref}
        type={isPassword ? "password" : "text"}
        example={"min 6 characters"}
      />

      <button
        type="button"
        className="absolute right-4 top-10 -translate-y-1/2"
        onClick={() => setIsPassword((prevState) => !prevState)}
      >
        {isPassword ? <Eye /> : <EyeOff />}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

"use client";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "./input";
import { Eye, EyeOff, Lock } from "lucide-react";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  { label: string; error: string | undefined } & ReturnType<
    UseFormRegister<Record<string, unknown>>
  >
>((inputProps, ref) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <>
      <div className="flex flex-col gap-2 relative">
        <Input
          {...inputProps}
          ref={ref}
          type={isPassword ? "password" : "text"}
        />

        <button
          className="absolute right-4 top-[2.7rem] transform -translate-y-1/2"
          onClick={() => setIsPassword((prevStat) => !prevStat)}
        >
          {isPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </>
  );
});

PasswordInput.displayName = "PasswordInput";

"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

type InputProps = {
  label: string;
  name: string;
  icon: JSX.Element;
  type: string;
};

const PasswordInputComponent = ({ label, icon, name }: InputProps) => {
  const [isPassword, setIsPassword] = useState(true);
  return (
    <main>
      <div className="flex flex-row items-center gap-1 ">
        {icon}
        <label htmlFor={label} className="text-md">
          {label.toUpperCase().charAt(0) + label.slice(1)}
        </label>
      </div>
      <div className="relative">
        <input
          type={isPassword ? "password" : "text"}
          name={name}
          id={label}
          className="p-1 my-1 border rounded-lg lg:w-72 sm:w-54"
          placeholder={`Enter your ${name}`}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => setIsPassword((prevStat) => !prevStat)}
        >
          {isPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </main>
  );
};

export default PasswordInputComponent;

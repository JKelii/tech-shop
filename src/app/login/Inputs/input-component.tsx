import React from "react";

type InputProps = {
  label: string;
  name: string;
  icon: JSX.Element;
  type: string;
};

const InputComponent = ({ label, icon, type, name }: InputProps) => {
  return (
    <main>
      <div className="flex flex-row items-center gap-1 ">
        {icon}
        <label htmlFor={label} className="text-md">
          {label.toUpperCase().charAt(0) + label.slice(1)}
        </label>
      </div>
      <input
        type={type}
        name={name}
        id={label}
        className="p-1 my-1 border rounded-lg lg:w-72 sm:w-54"
        placeholder={`Enter your ${name}`}
      />
    </main>
  );
};

export default InputComponent;

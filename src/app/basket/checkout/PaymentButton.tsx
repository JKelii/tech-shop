import React from "react";

export const PaymentButton = ({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <button
        className={`border-2 border-gray-300 p-2 w-24 rounded-md hover:bg-gray-300 ${
          active ? "bg-gray-300" : "hover:bg-gray-300"
        }`}
        type="button"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

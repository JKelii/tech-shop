"use client";
import React, { useState } from "react";
import { PaymentButton } from "./PaymentButton";

export const PaymentButtonsComponent = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setActiveButton(name);
  };
  return (
    <div className="flex gap-8 my-4 mx-2 ">
      <PaymentButton
        text={"Card"}
        active={activeButton === "Card"}
        onClick={() => handleClick("Card")}
      />
      <PaymentButton
        text={"Paypal"}
        active={activeButton === "Paypal"}
        onClick={() => handleClick("Paypal")}
      />
      <PaymentButton
        text={"Other"}
        active={activeButton === "Other"}
        onClick={() => handleClick("Other")}
      />
    </div>
  );
};

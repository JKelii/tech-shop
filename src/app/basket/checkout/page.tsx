import Image from "next/image";
import React from "react";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";

const page = () => {
  return (
    <div className="min-h-screen flex justify-center items-start mt-10 gap-8">
      <div className="flex justify-center items-start border-2 border-gray-400 p-4 rounded-md">
        <OrderSummary />
      </div>
      <div className="flex justify-center items-start border-2 border-gray-400 p-4 rounded-md">
        <Payment />
      </div>
    </div>
  );
};

export default page;

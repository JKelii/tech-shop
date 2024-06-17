import React from "react";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";

const page = () => {
  //TODO: Change errors of yup inputs
  return (
    <div className="min-h-screen flex justify-center items-start mt-10 gap-8 w-[30rem]">
      <div className="flex justify-center items-start border-2 border-gray-400 p-4 rounded-md">
        <OrderSummary />
      </div>
      <div className="flex justify-center items-start border-2 border-gray-400 p-4 rounded-md w-[35rem]">
        <Payment />
      </div>
    </div>
  );
};

export default page;

"use client";
import { Input } from "@/app/login/Inputs/input";
import { paymentCardSchema } from "@/app/schema/userValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import MonthsDropdown from "./MonthsDropdown";
import YearDropdown from "./YearDropdown";
import { cn } from "@/lib/utils";

const MonthPopover = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(paymentCardSchema) });

  const onSubmit = handleSubmit(() => {
    console.log("Hej");
  });

  return (
    <form
      className="flex flex-col justify-center items-center "
      onSubmit={onSubmit}
    >
      <h2>Payment</h2>
      <div className="flex gap-8 m-2">
        <button className="border-2 border-gray-300 p-2 w-24 rounded-md hover:bg-gray-300">
          Card
        </button>
        <button className="border-2 border-gray-300 p-2 w-24 rounded-md hover:bg-gray-300">
          Paypal
        </button>
        <button className="border-2 border-gray-300 p-2 w-24 rounded-md hover:bg-gray-300">
          Other
        </button>
      </div>
      <Input
        error={errors.card?.message}
        {...register("card")}
        label="Card number"
        type="text"
        name="card number"
      />
      <div className="flex flex-row justify-center items-start">
        <MonthsDropdown />
        <YearDropdown />
        <Input
          className="w-32 self-start"
          error={errors.cvc?.message}
          {...register("cvc")}
          label="CVC"
          type="text"
          name="cvc"
        />
      </div>
      <button
        className="text-white bg-black rounded-md py-2 px-1 m-2"
        type="submit"
      >
        Pay 450$
      </button>
    </form>
  );
};

export default MonthPopover;

"use client";
import { Input } from "@/components/Inputs/input";
import { paymentCardSchema } from "@/app/schema/userValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import MonthsDropdown from "./MonthsDropdown";
import YearDropdown from "./YearDropdown";
import { PaymentButtonsComponent } from "./PaymentButtonsComponent";

const MonthPopover = () => {
  //TODO: Change input lastName
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
      className="flex flex-col justify-center items-center"
      onSubmit={onSubmit}
    >
      <h2 className="text-black font-bold text-xl py-2">Shipping Details</h2>
      <div className="flex my-2 justify-between items-center w-full px-2">
        <Input
          className="w-44 self-start"
          error={errors.name?.message}
          {...register("name")}
          label="First Name"
          type="text"
        />

        <Input
          className="w-44 self-start"
          error={errors.lastName?.message}
          {...register("lastName")}
          label="Last Name"
          type="text"
        />
      </div>
      <Input
        className="w-96 self-start"
        error={errors.address?.message}
        {...register("address")}
        label="address"
        type="text"
      />
      <div className="flex my-2 justify-between items-center w-full px-2">
        <Input
          className="w-44 self-start"
          error={errors.city?.message}
          {...register("city")}
          label="city"
          type="text"
        />
        <Input
          className="w-44 self-start"
          error={errors.zip?.message}
          {...register("zip")}
          label="zip"
          type="text"
        />
      </div>
      <h2 className="text-black font-bold text-xl py-2">Payment</h2>
      <PaymentButtonsComponent />
      <div className="self-start px-2 my-4">
        <Input
          error={errors.card?.message}
          className="w-96 self-start"
          {...register("card")}
          label="Card number"
          type="text"
          name="card number"
        />
      </div>
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

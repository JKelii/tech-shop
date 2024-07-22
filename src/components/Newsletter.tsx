"use client";
import React, { useState } from "react";
import { Input } from "./Inputs/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaNewsletter } from "@/app/schema/userValidation";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaNewsletter),
  });

  const [newsletter, setNewsletter] = useState(false);

  const onSubmit = handleSubmit(() => {
    setNewsletter(true);
  });

  return (
    <div className="bg-neutral-100 w-[22rem] md:w-[35rem] h-96 flex flex-col justify-start items-center rounded-lg shadow-lg ">
      {newsletter ? (
        <>
          <div className="flex justify-center items-center mt-5 flex-col w-3/4">
            <h2 className="text-xl font-bold">Thank you for subscribing!</h2>
            <p className="mb-5 text-gray-600 mt-5">
              You&apos;re now signed up to receive our latest news and updates.
            </p>
            <p className="text-gray-600">
              We&apos;ve sent a confirmation email to the address you provided.
              Please check your inbox and click the link to complete your
              subscription.
            </p>
            <p className="mt-5 text-gray-600">
              If you have any questions or need assistance, feel free to{" "}
              <span className="underline cursor-pointer"> contact us.</span>
            </p>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h2 className="mt-5 text-xl font-bold">Newsletter</h2>
          <p className="w-3/4 mt-5 text-gray-600">
            Stay up to date with the latest news, updates, and exclusive offers.
          </p>
          <form
            action="submit"
            onSubmit={onSubmit}
            className="mt-5 flex justify-center items-center flex-col gap-4"
            noValidate
          >
            <Input
              error={errors.email?.message}
              {...register("email")}
              label="email"
              type="email"
            />
            <button className="flex bg-black text-white font-bold w-40 h-10 mt-2 gap-2 justify-center items-center rounded-lg">
              <Mail />
              Subscribe
            </button>
            <p className="text-sm text-gray-600 mt-2">
              We&apos;ll never share your email. Read our{" "}
              <span className="underline cursor-pointer"> privacy policy</span>.
            </p>
          </form>{" "}
        </>
      )}
    </div>
  );
};

export default Newsletter;

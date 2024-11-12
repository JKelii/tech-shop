"use client";
import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerUserAction } from "@/actions/register";
import { toast } from "sonner";
import { userSchemaRegister } from "@/app/schema/userValidation";
import { Input } from "@/components/Inputs/input";
import { PasswordInput } from "@/components/Inputs/passwordInput";

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaRegister),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { createAccount } = await registerUserAction(data);
      toast("Account created ✅");

      return createAccount;
    } catch (error) {
      toast("Email already used");
    }
  });

  return (
    <main className="flex justify-center flex-wrap items-center grow w-full mt-10 lg:mt-4 xl:mt-0 mb-10 lg:mb-4 xl:mb-0">
      <div className="w-[25rem] h-[33rem] lg:mt-0 border-2 border-gradient-to-r border-gray-500 rounded-md py-8 shadow-2xl flex justify-center items-center flex-col">
        <p className="text-2xl font-bold text-center px-4 text-black">
          Register
        </p>
        <p className="text-center text-sm text-gray-600 py-4">
          Create a new account to get started.
        </p>

        <form
          noValidate
          onSubmit={onSubmit}
          className="flex items-center flex-col h-[45rem] w-96 gap-4"
        >
          <Input
            error={errors.name?.message}
            {...register("name")}
            label="name"
            type="text"
            example="example: John"
          />
          <Input
            error={errors.email?.message}
            {...register("email")}
            label="email"
            type="email"
            example="example: johndoe@gmail.com"
          />

          <PasswordInput
            label="Password"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-64 py-2 mt-4 text-white bg-black rounded hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/60 focus:ring-opacity-50"
          >
            Register
          </button>

          <div className="flex items-center gap-1">
            <p>Already have an account?</p>
            <a href="/login" className="font-bold text-black">
              Login
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterComponent;

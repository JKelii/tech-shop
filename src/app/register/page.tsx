"use client";
import React from "react";
import { AtSign, Lock, User } from "lucide-react";
import { Input } from "../../components/Inputs/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaRegister } from "../schema/userValidation";
import { PasswordInput } from "../../components/Inputs/passwordInput";
import { registerUserAction } from "@/actions/register";
import { create } from "domain";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaRegister),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { createAccount } = await registerUserAction(data);
    alert(createAccount?.id);
  });

  return (
    <main className="flex  justify-center items-center min-h-screen w-full -mt-8">
      <div className="w-[25rem] h-[35rem] m-6 mt-10 md:mt-10 lg:mt-0 sm:ms-0 border-2 border-gradient-to-r border-gray-500 rounded-md py-8 shadow-2xl flex justify-center items-center flex-col ">
        <p className="text-2xl font-bold text-center p-4 text-black">
          Register
        </p>
        <p className="text-center text-sm text-gray-600 py-4">
          Create a new account to get started.
        </p>
        <form
          onSubmit={onSubmit}
          className="flex items-center flex-col h-[45rem] w-96 gap-4"
        >
          <Input
            error={errors.email?.message}
            {...register("name")}
            label="name"
            type="text"
          />
          <Input
            error={errors.email?.message}
            {...register("email")}
            label="email"
            type="email"
          />
          <PasswordInput
            label="Password"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-64 py-2 text-white bg-black rounded hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/60 focus:ring-opacity-50"
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

export default Register;

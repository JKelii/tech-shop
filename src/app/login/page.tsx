"use client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaLogin } from "../schema/userValidation";
import { Input } from "../../components/Inputs/input";
import { PasswordInput } from "../../components/Inputs/passwordInput";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaLogin),
  });

  const onSubmit = handleSubmit(async (data) => {
    await signIn("credentials", { ...data, redirect: true, callbackUrl: "/" });
    toast("You are logged in ✅");
  });
  const session = useSession();

  return (
    <main className="flex justify-center flex-wrap items-center grow w-full mt-10 lg:mt-4 xl:mt-0 mb-10 lg:mb-4 xl:mb-0">
      <div className="w-[25rem] h-[33rem] lg:mt-0 border-2 border-gradient-to-r border-gray-500 rounded-md py-8 gap-4 shadow-2xl flex justify-center items-center flex-col">
        <p className="text-2xl font-bold text-center p-2 text-black">Login</p>
        <p className="text-center text-md text-gray-600">
          Enter your email and password to access your account.
        </p>

        <form
          className="flex items-center mt-2 flex-col h-[45rem] w-[25rem] gap-6"
          onSubmit={onSubmit}
          noValidate
        >
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
            name="password"
          />

          <button
            type="submit"
            className="w-64 py-2 text-white bg-black rounded hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/60 focus:ring-opacity-50"
          >
            Sign in
          </button>
          <div className="flex items-center gap-1">
            <p>Don&apos;t have an account? </p>
            <a href="/register" className="font-bold text-black/90">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;

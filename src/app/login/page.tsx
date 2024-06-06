"use client";
import React from "react";
import { AtSign } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaLogin } from "../schema/userValidation";
import { Input } from "./Inputs/input";
import { PasswordInput } from "./Inputs/passwordInput";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaLogin),
  });

  const onSubmit = () => {
    console.log("hej");
  };

  return (
    <main className="flex  justify-center items-center min-h-screen w-full -mt-8  ">
      <div className="w-[25rem] h-[479px] ms-6 sm:ms-0 lg:mt-0 border-2 border-gradient-to-r border-gray-500 rounded-md py-8 shadow-2xl flex justify-center items-center flex-col">
        <p className="text-2xl font-bold text-center p-4 text-mainBg">
          Welcome Back
        </p>
        <form
          className="flex items-center flex-col h-[45rem] w-[25rem] gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            icon={<AtSign />}
            error={errors.email?.message}
            {...register("email")}
            label="email"
            type="email"
            name="Email"
          />
          <PasswordInput
            label="Password"
            {...register("password")}
            error={errors.password?.message}
            name="password"
          />
          <div className="flex justify-between items-center w-72">
            <div className="items-top flex space-x-2">
              <Checkbox
                id="terms1"
                className="data-[state=checked]:bg-mainBg"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms1" className="text-sm font-medium">
                  Remember me
                </label>
              </div>
            </div>
            <a href="/" className="text-sm text-mainBg font-bold">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-48 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Log In
          </button>
          <div className="flex items-center gap-1">
            <p>Don&apos;t have an account? </p>
            <a href="/register" className="font-bold text-mainBg">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;

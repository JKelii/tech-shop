"use client";
import React from "react";
import { AtSign, Lock, User } from "lucide-react";
import { Input } from "../login/Inputs/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaRegister } from "../schema/userValidation";
import { PasswordInput } from "../login/Inputs/passwordInput";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaRegister),
  });

  const onSubmit = () => {
    console.log("hej");
  };

  return (
    <main className="flex  justify-center items-center min-h-screen w-full -mt-8">
      <div className="w-[25rem] h-[479px] m5-6 sm:ms-0 lg:mt-0 border-2 border-gradient-to-r border-gray-500 rounded-md py-8 shadow-2xl flex justify-center items-center flex-col ">
        <p className="text-2xl font-bold text-center p-4 text-mainBg">
          Register new account
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center flex-col h-[45rem] w-96 gap-4"
        >
          <Input
            icon={<User />}
            error={errors.email?.message}
            {...register("name")}
            label="name"
            type="text"
            name="name"
          />
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

          <button
            type="submit"
            className="w-48 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Register
          </button>

          <div className="flex items-center gap-1">
            <p>Already have an account?</p>
            <a href="/login" className="font-bold text-mainBg">
              Login
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;

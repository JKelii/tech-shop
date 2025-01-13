"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "../../components/Inputs/input";
import { PasswordInput } from "../../components/Inputs/passwordInput";
import { userSchemaLogin } from "../schema/userValidation";

import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaLogin),
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      if (data) {
        await signIn("credentials", {
          ...data,
          redirect: true,
          callbackUrl: "/",
        });
      }

      toast("You are logged in ✅");
    });
  });

  return (
    <main className="my-10 flex w-full grow flex-wrap items-center justify-center lg:my-4 xl:my-0">
      <div className="border-gradient-to-r flex h-[33rem] w-[25rem] flex-col items-center justify-center gap-4 rounded-md border-2 border-gray-500 py-8 shadow-2xl lg:mt-0">
        <p className="p-2 text-center text-2xl font-bold text-black">Login</p>
        <p className="text-md text-center text-gray-600">
          Enter your email and password to access your account.
        </p>
        <form
          className="mt-2 flex h-[45rem] w-[25rem] flex-col items-center gap-6"
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
          {!isPending ? (
            <Button
              type="submit"
              className="focus:ring-opacity/50 w-64 rounded bg-black py-2 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/60"
              disabled={isPending}
            >
              Sign in
            </Button>
          ) : (
            <Button
              disabled
              className="focus:ring-opacity/50 w-64 rounded bg-black py-2 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/60"
            >
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          )}

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

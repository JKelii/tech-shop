"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/Inputs/input";
import { PasswordInput } from "@/components/Inputs/passwordInput";
import { Button } from "@/components/ui/button";

import { registerUserAction } from "@/actions/register";
import { userSchemaRegister } from "@/app/schema/userValidation";

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaRegister),
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = handleSubmit((data) => {
    try {
      startTransition(async () => {
        const { createAccount } = await registerUserAction(data);
        if (createAccount) {
          toast("Account created ✅");
        }
      });
    } catch (error) {
      toast("Email already used");
      throw error;
    }
  });

  return (
    <main className="my-10 flex w-full grow flex-wrap items-center justify-center lg:my-4 xl:my-0">
      <div className="border-gradient-to-r flex h-[33rem] w-[25rem] flex-col items-center justify-center rounded-md border-2 border-gray-500 py-8 shadow-2xl lg:mt-0">
        <p className="px-4 text-center text-2xl font-bold text-black">
          Register
        </p>
        <p className="py-4 text-center text-sm text-gray-600">
          Create a new account to get started.
        </p>

        <form
          noValidate
          onSubmit={onSubmit}
          className="flex h-[45rem] w-96 flex-col items-center gap-4"
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
          {!isPending ? (
            <Button
              type="submit"
              className="focus:ring-opacity/50 mt-2 w-64 rounded bg-black py-2 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/60"
            >
              Register
            </Button>
          ) : (
            <Button
              disabled
              className="focus:ring-opacity/50 mt-2 w-64 rounded bg-black py-2 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/60"
            >
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          )}

          <div className="mb-2 flex items-center gap-1">
            <p>Already have an account?</p>
            <Link href="/login" className="font-bold text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterComponent;

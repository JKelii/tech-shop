"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

import { Input } from "../../Inputs/input";

import { signUpNewsletter } from "@/app/api/auth/[...nextauth]/signUpNewsletter";
import { userSchemaNewsletter } from "@/app/schema/userValidation";

const Newsletter = ({
  isSignedInNewsletter,
  emailCookie,
}: {
  isSignedInNewsletter: boolean;
  emailCookie: string | undefined;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaNewsletter),
  });

  const { data: session } = useSession();

  if (emailCookie?.includes(session?.user?.email ?? "")) {
    isSignedInNewsletter = true;
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUpNewsletter(data.email);

      window.location.reload();
    } catch (error) {
      throw error;
    }
  });

  return (
    <div className="flex h-96 w-[22rem] flex-col items-center justify-start rounded-lg border bg-white shadow-lg md:w-[35rem] ">
      {isSignedInNewsletter ? (
        <>
          <div className="mt-5 flex w-3/4 flex-col items-center justify-center">
            <h2 className="text-xl font-bold">Thank you for subscribing!</h2>
            <p className="my-5 text-gray-600">
              You&apos;re now signed up to receive our latest news and updates.
            </p>
            <p className="text-gray-600">
              We&apos;ve sent a confirmation email to the address you provided.
              Please check your inbox and click the link to complete your
              subscription.
            </p>
            <p className="mt-5 text-gray-600">
              If you have any questions or need assistance, feel free to{" "}
              <span className="cursor-pointer underline"> contact us.</span>
            </p>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h2 className="mt-5 text-xl font-bold">Newsletter</h2>
          <p className="mt-5 w-3/4 text-gray-600">
            Stay up to date with the latest news, updates, and exclusive offers.
          </p>
          <form
            action="submit"
            onSubmit={onSubmit}
            className="mt-5 flex flex-col items-center justify-center gap-4"
            noValidate
          >
            <Input
              error={errors.email?.message}
              {...register("email")}
              label="email"
              type="email"
            />
            <button className="mt-2 flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-black font-bold text-white">
              <Mail />
              Subscribe
            </button>
            <p className="ml-4 mt-2 text-sm text-gray-600">
              We&apos;ll never share your email. Read our{" "}
              <span className="cursor-pointer underline"> privacy policy</span>.
            </p>
          </form>{" "}
        </>
      )}
    </div>
  );
};

export default Newsletter;

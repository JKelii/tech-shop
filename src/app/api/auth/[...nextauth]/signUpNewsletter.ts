"use server";

import { getEnv } from "@/utils";
import { cookies } from "next/headers";

export const signUpNewsletter = async (email: string) => {
  const response = await fetch(
    "https://connect.mailerlite.com/api/subscribers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getEnv(process.env.NEXT_PUBLIC_MAILERLITE)}`,
      },
      body: JSON.stringify({ email }),
    }
  );

  const data = response.json();

  const cookieStore = cookies();
  const existingEmail = cookieStore.get("email")?.value || "[]";
  const emailList = JSON.parse(existingEmail);

  if (!emailList.includes(email)) {
    emailList.push(email);
  }

  cookieStore.set("email", JSON.stringify(emailList), {
    path: "/contact",
    maxAge: 60 * 60 * 24 * 365,
  });

  return data;
};

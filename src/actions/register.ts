"use server";
import { createAccount } from "@/lib";
import * as bcrypt from "bcrypt";
export async function registerUserAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const hashedPassword = bcrypt.hashSync(password, 12);
  const account = await createAccount({
    email,
    password: hashedPassword,
  });
  return account;
}

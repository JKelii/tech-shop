"use server";
import { createAccount } from "@/lib";
import * as bcrypt from "bcrypt";
export async function registerUserAction({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = bcrypt.hashSync(password, 12);
  const account = await createAccount({
    email,
    password: hashedPassword,
    name,
  });
  return account;
}

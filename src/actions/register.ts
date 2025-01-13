"use server";
import * as bcrypt from "bcrypt";

import { createAccount } from "@/lib";

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

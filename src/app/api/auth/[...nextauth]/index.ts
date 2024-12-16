import * as bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

import { userSchemaLogin } from "@/app/schema/userValidation";
import { getAccount } from "@/lib";

import type { NextAuthOptions } from "next-auth";

export const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const { email, password } = userSchemaLogin.validateSync(credentials);
          const { account } = await getAccount(email);
          const hashedPassword = account?.password;
          if (!hashedPassword) return null;
          await bcrypt.compare(password, hashedPassword);
          return { id: account.id, email: account.email, name: account.name };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;

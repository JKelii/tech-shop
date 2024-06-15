import { userSchemaLogin } from "@/app/schema/userValidation";
import { getAccount } from "@/lib";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

const handler: NextAuthOptions = NextAuth({
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
          bcrypt.compare(hashedPassword, password);
          return { id: account.id, email: account.email };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler: NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        console.log("hi");
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email !== "john@gmail.com" && password !== "1234") {
          return null;
        }
        return { id: "1234" };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

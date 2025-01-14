import { cleanEnv, str } from "envalid";

export const env = cleanEnv(
  {
    NEXT_PUBLIC_MAILERLITE: process.env.NEXT_PUBLIC_MAILERLITE,
  },
  {
    NEXT_PUBLIC_MAILERLITE: str(),
  },
);

export const getEnv = (env: string | undefined) => {
  if (!env) throw new Error(`Missing env ${env}`);
  return env;
};

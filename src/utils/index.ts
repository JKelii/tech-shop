// import { cleanEnv, str } from "envalid";

export const getEnv = (env: string | undefined) => {
  if (!env) throw new Error(`Missing env ${env}`);
  return env;
};
//TODO: FIX MAILERLITE
// export const env = cleanEnv(process.env.NEXT_PUBLIC_MAILERLITE, {
//   MAILERLITE: str(),
// });

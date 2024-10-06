import { cleanEnv, str } from "envalid";

export const getEnv = (env: string | undefined) => {
  if (!env) throw new Error(`Missing env ${env}`);
  return env;
};
//TODO: Check
// export const env = cleanEnv(process.env, {
//   MAILERLITE: str(),
// });

import { cleanEnv, str, email, json } from "envalid";

export const getEnv = (env: string | undefined) => {
  if (!env) throw new Error(`Missing env ${env}`);
  return env;
};

export const env = cleanEnv(process.env, {
  MAILERLITE: str(),
});

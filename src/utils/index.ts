export const getEnv = (env: string | undefined) => {
  if (!env) throw new Error(`Missing env ${env}`);
  return env;
};

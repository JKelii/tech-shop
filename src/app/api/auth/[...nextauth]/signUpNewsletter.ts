import { env } from "@/utils";

export const signUpNewsletter = async (email: string) => {
  const response = await fetch(
    "https://connect.mailerlite.com/api/subscribers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${env.MAILERLITE}`,
      },
      body: JSON.stringify({ email }),
    }
  );

  return response.json();
};

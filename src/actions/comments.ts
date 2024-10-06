"use server";

import { createProductReview } from "@/lib";

export const createComment = async ({
  email,
  content,
  name,
  slug,
  date,
}: {
  email: string;
  content: string;
  name: string;
  slug: string;
  date: string;
}) => {
  if (!email) {
    return { error: "Email is required" };
  }

  if (content) {
    const comment = await createProductReview({
      email,
      content,
      name,
      slug,
      date,
    });
    return comment;
  }
};

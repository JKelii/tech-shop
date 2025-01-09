"use server";

import { cookies } from "next/headers";

import { getProductSlug } from "@/lib";

import type { GetProductBySlugQuery } from "@/lib/hygraph/generated/graphql";

export const addToLastSeenItems = async ({ slug }: { slug: string }) => {
  const cookieStore = await cookies();
  const addedCookie = (await cookieStore).get("product");

  let products = [];

  if (addedCookie) {
    try {
      products = JSON.parse(addedCookie.value);
    } catch (error) {
      console.error(error);
    }
  }

  products = products.filter((item: string) => item !== slug);
  products.unshift(slug);
  products = products.slice(0, 4);
  (await cookieStore).set("product", JSON.stringify(products), {
    httpOnly: true,
    secure: true,
  });
  return products;
};

export const getLastSeenFromCookies = async (): Promise<
  GetProductBySlugQuery[] | undefined
> => {
  const productFromCookie = (await cookies()).get("product");
  if (productFromCookie?.value) {
    const products = JSON.parse(productFromCookie.value);
    if (products) {
      const filteredItems = await Promise.all(
        products.map((item: string) => getProductSlug({ slug: item })),
      );
      return filteredItems;
    }
  }
};

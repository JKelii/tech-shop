"use server";

import { getProductSlug } from "@/lib";
import { GetProductBySlugQuery } from "@/lib/hygraph/generated/graphql";
import { cookies } from "next/headers";
//TODO: Change name, change left, unshift

export const addToLastSeenItems = async ({ slug }: { slug: string }) => {
  const cookieStore = cookies();
  const addedCookie = cookieStore.get("product");

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

  cookieStore.set("product", JSON.stringify(products), {
    httpOnly: true,
    secure: true,
  });
  return products;
};

export const getLastSeenFromCookies = async (): Promise<
  GetProductBySlugQuery[] | undefined
> => {
  const productFromCookie = cookies().get("product");
  if (productFromCookie?.value) {
    const products = JSON.parse(productFromCookie.value);
    if (products) {
      const filteredItems = await Promise.all(
        products.map((item: string) => getProductSlug({ slug: item }))
      );
      return filteredItems;
    }
  }
};

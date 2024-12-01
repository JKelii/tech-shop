"use server";

import { getProductSlug } from "@/lib";
import { cookies } from "next/headers";
//TODO: Change name, change left, unshift
export const createLastSeenCookie = ({ slug }: { slug: string }) => {
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
  products = products.slice(0, 2);
  products.unshift(slug);

  cookieStore.set("product", JSON.stringify(products), {
    httpOnly: true,
    secure: true,
  });
  return products;
};

export const getProductsFromCookies = async () => {
  const productFromCookie = cookies().get("product");
  const arr = [];
  if (productFromCookie) {
    try {
      const products = JSON.parse(productFromCookie?.value);
      if (products) {
        const filteredItem = await Promise.all(
          products.map((item: string) => getProductSlug({ slug: item }))
        );
        arr.push(filteredItem);
        return arr;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

"use server";

import { getProductsByCategory } from "@/lib";

export const getProductsByCategories = async ({
  categoryName,
}: {
  categoryName: string;
}) => {
  const products = await getProductsByCategory({ categoryName });
  return products.products;
};

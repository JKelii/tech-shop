import React from "react";

import ProductOfferDisplay from "./ProductOfferDisplay";

import { getAllProducts } from "@/lib";

export const ProductOfferList = async () => {
  const { products } = await getAllProducts();
  return (
    <>
      <ProductOfferDisplay index={11} products={products} />
      <ProductOfferDisplay index={8} products={products} />
      <ProductOfferDisplay index={14} products={products} />
      <ProductOfferDisplay index={5} products={products} />
      <ProductOfferDisplay index={7} products={products} />
      <ProductOfferDisplay index={17} products={products} />
    </>
  );
};

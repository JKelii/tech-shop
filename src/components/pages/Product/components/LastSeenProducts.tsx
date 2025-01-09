"use client";
import React from "react";

type ProductType =
  | {
      description: string;
      id: string;
      name: string;
      price: number;
      quantity: number;
      slug: string;
      size: Array<{
        productVariantSize: Array<{
          name?: string | null;
          productQuantity: Array<number>;
        }>;
      }>;
      reviews: Array<{
        content: string;
        name: string;
        date: string;
      }>;
      images: Array<{
        fileName: string;
        url: string;
      }>;
    }
  | null
  | undefined;

export const LastSeenProducts = ({ product }: { product: ProductType }) => {
  if (!product) {
    return null;
  }

  return (
    <div>
      <p>Tu jest product</p>
      {product?.name}
    </div>
  );
};

export default LastSeenProducts;

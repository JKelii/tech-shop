"use client";

import AddToCartButton from "./addToCartButton";

import { WishList } from "@/components/pages/Product/components/WishList";

import type { ProductType } from "./ProductPage";

type ProductManagementProps = {
  product: ProductType;
  favoriteId: string | undefined;
  productQuantity: number;
};

export const ProductManagement = ({
  product,
  favoriteId,
  productQuantity,
}: ProductManagementProps) => {
  return (
    <div className="flex flex-col md:gap-4">
      <div className="flex items-end justify-end  ">
        <AddToCartButton
          product={{
            ...product,
            quantity: productQuantity,
          }}
        />
        <WishList
          favoriteId={favoriteId}
          id={product.id}
          slug={product.slug}
          name={product.name}
          image={product.images[0]?.url}
          price={product.price}
        />
      </div>
    </div>
  );
};

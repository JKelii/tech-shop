"use client";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Comments from "./components/Comments";
import useShopContext from "@/hooks/useShopContext";
import { ProductManagement } from "./components/ProductManagement";

export type ProductType = {
  description: string;
  id: string;
  name: string;
  price: number;
  slug: string;
  reviews: {
    content: string;
    name: string;
  }[];
  images: {
    fileName: string;
    url: string;
  }[];
};

export const ProductPage = ({
  product,
  slug,
  favoriteId,
}: {
  product: ProductType;
  slug: string;
  favoriteId: string | undefined;
}) => {
  const { quantity, setQuantity } = useShopContext();

  return (
    <div className="flex flex-col justify-start shadow-md container mx-auto items-center min-h-screen bg-gray-100/50 border-2 border-gray-200 mt-10 rounded-lg mb-10">
      <div className="flex flex-col md:flex-row justify-center items-start gap-10  p-8 rounded-md">
        {product ? (
          <Image
            src={product.images[0]?.url}
            alt={product.name}
            width={450}
            height={150}
            quality={100}
            className="border-2 border-gray-300 rounded-md h-96"
          />
        ) : (
          <Image
            src=""
            alt="product"
            width={450}
            height={150}
            quality={100}
            className="border-2 border-gray-300 rounded-md h-96"
          />
        )}

        <article className=" flex flex-col items-start justify-center gap-6">
          <div className="flex justify-between items-center w-full">
            <p className="font-bold text-3xl self-start">{product.name}</p>
            <p className="self-start text-black font-bold text-3xl">
              {priceUpdate(product.price)}
            </p>
          </div>
          <p className="self-start">{product?.description}</p>
          {/* //TODO: Add If item doesnt have size radio group won't show */}
          {/* TODO: Change radio group select quantity and add to cart Manage product */}
          <ProductManagement
            favoriteId={favoriteId}
            quantity={quantity}
            setQuantity={setQuantity}
            product={product}
          />
        </article>
      </div>
      <Comments reviews={product.reviews} slug={slug} />
    </div>
  );
};

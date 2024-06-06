import AddToCartButton from "@/components/addToCartButton";
import { getProductSlug } from "@/lib";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";

type ProductType = {
  description: string;
  id: string;
  name: string;
  price: number;
  slug: string;
  images: {
    fileName: string;
    url: string;
  }[];
};

export const ProductPage = async ({ product }: { product: ProductType }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className="flex flex-col justify-center items-center gap-10 border-2 border-gray-500 p-8 rounded-md">
        <Image
          src={product.images[0].url}
          alt={product.name}
          width={300}
          height={300}
          quality={100}
          className="border-2 border-gray-300 rounded-md w-full"
        />
        <article className=" w-80 self-start flex flex-col items-center justify-start gap-2">
          <p className="font-bold text-2xl self-start">{product.name}</p>
          <p className="self-start text-black font-bold text-xl">
            {priceUpdate(product.price)}
          </p>
          <p className="self-start">{product?.description}</p>
          <AddToCartButton
            slug={product.slug}
            name={product.name}
            image={product.images[0].url}
            price={product.price}
          />
        </article>
      </div>
    </div>
  );
};

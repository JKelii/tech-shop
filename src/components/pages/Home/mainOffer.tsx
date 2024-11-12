import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllProducts } from "@/lib";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import React from "react";

const MainOffer = async () => {
  const { products } = await getAllProducts();

  const bestProducts = [products[8], products[11], products[2], products[3]];

  return (
    <>
      <Card className=" shadow-lg  rounded-lg bg-gray-100/50 border-[2px] pb-6 px-4">
        <h2 className="text-2xl font-bold mb-4 ml-2 mt-4">Bestsellers</h2>
        <p className="text-muted-foreground mb-6  ml-2">
          Check out our most popular tech products to elevate your digital
          experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {bestProducts.map((product) => (
            <section
              key={product.slug}
              className="border border-gray-400 rounded-md  bg-white"
            >
              <a href={`/item/${product.slug}`}>
                <div className="w-full flex justify-center items-center bg-gray-50/50 rounded-t-md">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={400}
                    height={400}
                    priority
                    className="size-36 md:size-44 lg:size-96"
                  />
                </div>
                <Separator className="h-[1px] " />
                <div className="p-4 bg-white rounded-b-md ">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-muted-foreground">{product.description}</p>
                  <p className="font-bold text-lg">
                    Only for {priceUpdate(product.price)}
                  </p>
                </div>
              </a>
            </section>
          ))}
        </div>
      </Card>
    </>
  );
};
export default MainOffer;

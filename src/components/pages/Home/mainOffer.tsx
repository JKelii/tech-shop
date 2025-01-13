import Image from "next/image";
import React from "react";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getAllProducts } from "@/lib";
import { priceUpdate } from "@/utils/priceUpdate";

const MainOffer = async () => {
  const { products } = await getAllProducts();

  const bestProducts = [products[8], products[11], products[2], products[3]];

  return (
    <>
      <Card className=" rounded-lg  border-2 bg-gray-100/50 px-4  pb-6 shadow-lg">
        <h2 className="my-4 ml-2 text-2xl font-bold">Bestsellers</h2>
        <p className="mb-6 ml-2  text-muted-foreground">
          Check out our most popular tech products to elevate your digital
          experience.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {bestProducts.map((product) => (
            <section
              key={product.slug}
              className="rounded-md border border-gray-400 bg-white hover:border-gray-700"
            >
              <a href={`/item/${product.slug}`}>
                <div className="flex w-full items-center justify-center rounded-t-md bg-gray-50/50">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={400}
                    height={400}
                    priority
                    className="size-36 rounded-lg md:size-44 lg:size-96"
                  />
                </div>
                <Separator className="h-px " />
                <div className="rounded-b-md bg-white p-4 ">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-muted-foreground">{product.description}</p>
                  <p className="text-lg font-bold">
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

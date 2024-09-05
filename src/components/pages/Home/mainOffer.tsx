import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllProducts } from "@/lib";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import React from "react";

const MainOffer = async () => {
  const { products } = await getAllProducts();
  return (
    <>
      <Card className=" shadow-lg mt-2 rounded-lg bg-gray-100/60 border-[1px] pb-4 px-4">
        <h2 className="text-3xl font-bold mb-4 ml-2 mt-4">Bestsellers</h2>
        <p className="text-muted-foreground mb-6  ml-2">
          Check out our most popular tech products to elevate your digital
          experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {products.slice(2, 4).map((product) => (
            <section
              key={product.slug}
              className="border border-gray-400 rounded-md  bg-white"
            >
              <a href={`/item/${product.slug}`}>
                <div className="w-full flex justify-center items-center bg-gray-100 rounded-t-md">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={400}
                    height={400}
                    priority
                    className="size-28 md:size-44 lg:size-96"
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

{
  /* <div className="">
  <h2 className="text-2xl font-bold mb-4">Bestsellers</h2>
  <p className="text-muted-foreground mb-6">
    Check out our most popular tech products to elevate your digital experience.
  </p>
</div>; */
}

//  <div className="flex justify-center items-center gap-8 lg:gap-24 z-10 border-2 border-gray-500   rounded-md p-4">
//     <a href={`item/${products[2].slug}`}>
//       <div className="flex justify-center items-center gap-2 md:gap-8 lg:gap-24 cursor-pointer">
//         <div className="flex justify-center items-center flex-col gap-4">
//           <h2 className="font-bold text-sm lg:text-2xl text-gray-800">
//             Elevate Your Tech Experience
//           </h2>
//           <p className="text-sm lg:text-xl text-gray-600">
//             Discover the latest and greatest tech products to enhance your
//             digital lifestyle.
//           </p>
//           <div className="flex flex-col justify-center items-center">
//             <p className="font-bold text-sm lg:text-2xl">Only for </p>
//             <p className="font-bold text-sm lg:text-2xl">
//               {priceUpdate(products[2].price)}
//             </p>
//           </div>
//         </div>
//         <Image
//           src={products[2].images[0].url}
//           alt={products[2].name}
//           width={300}
//           height={300}
//           priority
//           className="size-28 md:size-44 lg:size-80 "
//         />
//       </div>
//     </a>
//   </div>

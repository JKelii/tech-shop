import { getFavoriteAuthorized } from "@/actions/favorite";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { DeleteFavoriteButton } from "./_components/DeleteFavoriteButton";
import { priceUpdate } from "@/utils/priceUpdate";
import Link from "next/link";

//TODO: Create mapper for favorite products
const FavoritesPage = async () => {
  const session = await getServerSession();

  const favoriteProducts = await getFavoriteAuthorized({
    email: session?.user?.email,
  });

  const favorite = favoriteProducts?.favoriteProducts;

  return (
    <main className=" min-h-screen container mx-auto flex justify-start items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <h2 className="text-black font-bold text-2xl">Wishlist</h2>
      <p className="text-sm text-muted-foreground">
        {" "}
        The Wishlist component allows users to curate a personalized collection
        of products they are interested in purchasing.{" "}
      </p>
      {favorite?.map((item, index) => (
        <div
          className="flex border-[1px] border-gray-400 p-4 justify-center items-center rounded-md"
          key={index}
        >
          <Link
            href={`/item/${item.product?.slug}`}
            className="flex justify-center items-center"
          >
            <Image
              src={item.product?.images[0].url || ""}
              width={200}
              height={200}
              alt={item.product?.name || ""}
            />
            <div className="flex flex-col w-96 items-center justify-center gap-6 p-4 m-4">
              <h2 className="text-xl font-bold text-black">
                {item.product?.name}
              </h2>
              <p className="text-sm text-muted-foreground ">
                {item.product?.description}
              </p>
              <p className="text-lg text-black">
                {item.product?.price !== undefined
                  ? priceUpdate(item.product.price)
                  : "Can't find price"}
              </p>
            </div>
            <div className="flex justify-center items-center"></div>
          </Link>
          <DeleteFavoriteButton favoriteId={item.id} session={session} />
        </div>
      ))}
    </main>
  );
};

export default FavoritesPage;

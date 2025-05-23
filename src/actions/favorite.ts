"use server";

import { revalidateTag } from "next/cache";

import {
  createFavoriteProduct,
  deleteFavoriteProduct,
  getFavorites,
} from "@/lib";

type AddToFavoriteAuthorizedParams = {
  slug: string;
  email: string;
};

export const addToFavoriteAuthorized = async ({
  slug,
  email,
}: AddToFavoriteAuthorizedParams) => {
  const createdFavorite = await createFavoriteProduct({ email, slug });
  if (!createdFavorite) {
    throw new Error("You have to be logged in");
  }
  revalidateTag("getFavoriteProducts");
};

export const deleteProductFromFavorite = async ({
  favoriteProductId,
  email,
}: {
  favoriteProductId: string;
  email: string;
}) => {
  const favorite = await getFavorites({ email });

  const favoriteToRemove = favorite?.find(
    ({ favoriteId }) => favoriteId === favoriteProductId,
  );

  if (!favoriteToRemove) {
    throw new Error("Product not found in favorites");
  }
  if (favoriteToRemove) {
    const deletedProduct = deleteFavoriteProduct({ favoriteProductId });
    if (!deletedProduct) {
      throw new Error("Can't delete product from favorites");
    }
  }
};

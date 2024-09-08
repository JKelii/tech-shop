"use server";

import {
  createFavoriteProduct,
  deleteFavoriteProduct,
  getFavoriteProduct,
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
  const createdFavorite = createFavoriteProduct({ email, slug });
  if (!createdFavorite) {
    throw new Error("Can't save product in favorites");
  }
};

export const getFavoriteAuthorized = async ({
  email,
}: {
  email: string | undefined | null;
}) => {
  const favoriteProducts = getFavorites({ email });

  if (!favoriteProducts) {
    throw new Error("Can't get products");
  }

  return favoriteProducts;
};

export const deleteProductFromFavorite = async ({
  favoriteProductId,
  email,
}: {
  favoriteProductId: string;
  email: string;
}) => {
  const favorite = await getFavoriteAuthorized({ email });

  const favoriteToRemove = favorite?.find(
    ({ favoriteId }) => favoriteId === favoriteProductId
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

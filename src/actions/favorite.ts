"use server";

import {
  createFavoriteProduct,
  deleteFavoriteProduct,
  getFavoriteProduct,
  getFavorites,
} from "@/lib";
import { cookies } from "next/headers";
import { string } from "yup";

const COOKIE_NAME_FAVORITE = "favorite";

type FavoriteItem =
  | {
      id: string;
      product?: {
        name: string;
        id: string;
        slug: string;
        price: number;
        description: string;
        images: Array<{
          url: string;
          fileName: string;
        }>;
      } | null;
    }[]
  | undefined;

type AddToFavoriteAuthorizedParams = {
  slug: string;
  email: string;
};

export const addToFavoriteAuthorized = async ({
  slug,
  email,
}: AddToFavoriteAuthorizedParams) => {
  // const findFavorite = cookies().get(COOKIE_NAME_FAVORITE);

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

  const favoriteToRemove = favorite?.favoriteProducts.find(
    ({ id }) => id === favoriteProductId
  );

  if (!favoriteToRemove) {
    throw new Error("Product not found in favorites");
  }

  const deletedProduct = deleteFavoriteProduct({ favoriteProductId });
  if (!deletedProduct) {
    throw new Error("Can't delete product from favorites");
  }
};

import { getEnv } from "@/utils";
import {
  CreateAccountDocument,
  CreateCartDocument,
  CreateCartProductDocument,
  CreateCartUnauthorizedDocument,
  CreateFavoriteProductDocument,
  CreateFavoriteUnAuthorizedDocument,
  CreateProductCartDocument,
  DeleteCartProductDocument,
  DeleteFavoriteProductDocument,
  GetAccountDocument,
  GetCartByIdDocument,
  GetFavoriteProductDocument,
  GetFavoritesDocument,
  GetProductBySlugDocument,
  GetProductsDocument,
  TypedDocumentString,
  UpdateCartProductDocument,
  UpdateCartQuantityDocument,
} from "./hygraph/generated/graphql";
import { connect } from "http2";
import { mapperGetCart } from "./mappers/getCart";
import { error } from "console";

type GraphQlError = {
  message: string;
};

type GraphQlErrorResponse<T> =
  | { data: T }
  | { errors: readonly GraphQlError[] };

export async function fetcher<Result, Variables>({
  query,
  variables,
  headers,
  cache = "force-cache",
  next,
}: {
  query: TypedDocumentString<Result, Variables>;
  variables?: Variables;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}): Promise<Result> {
  const endpoint = getEnv(process.env.NEXT_PUBLIC_API);

  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      query: query.toString(),
      ...(variables && { variables }),
    }),
    cache,
    next,
  });

  const body = (await result.json()) as GraphQlErrorResponse<Result>;

  if ("errors" in body) {
    throw body.errors[0];
  }

  return body.data;
}

export const getAllProducts = async () => {
  const data = await fetcher({
    query: GetProductsDocument,
    cache: "no-store",
  });
  if (!data) throw new Error("Problem with fetching products");
  return data;
};

export const getProductSlug = async ({ slug }: { slug: string }) => {
  const data = await fetcher({
    query: GetProductBySlugDocument,
    variables: { slug },
    cache: "no-store",
  });
  if (!data) throw new Error("Problem with fetching products");
  return data;
};

export const createAccount = async (credentials: {
  email: string;
  password: string;
  name: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: CreateAccountDocument,
    variables: credentials,
    cache: "no-store",
  });
  if (!data) throw new Error("Problem creating an account");
  return data;
};

export const getAccount = async (email: string) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: GetAccountDocument,
    variables: { email },
    cache: "no-store",
  });
  if (!data) throw new Error("Problem to get account");
  return data;
};

export const createCart = async ({
  quantity,
  slug,
  email,
}: {
  slug: string;
  quantity: number;
  email: string | undefined;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: email ? CreateCartDocument : CreateCartUnauthorizedDocument,
    variables: {
      quantity,
      slug,
      email,
    },
    cache: "no-store",
  });
  if (!data) throw new Error("Problem with creating authorized cart");
  return data.createCart;
};

export const getCart = async ({ id }: { id: string | undefined }) => {
  if (!id) {
    throw error("Problem to get cart id");
  }
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: GetCartByIdDocument,
    variables: {
      id,
    },
    cache: "no-store",
  });

  if (!data.cart) return;
  return mapperGetCart(data?.cart);
};

export const updateCartProduct = async ({
  quantity,
  cartProductId,
}: {
  quantity: number;
  cartProductId: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: UpdateCartProductDocument,
    variables: {
      quantity,
      cartProductId,
    },
    cache: "no-store",
  });

  if (!data) return;
  return data;
};

export const deleteCartProduct = async ({
  cartProductId,
}: {
  cartProductId: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: DeleteCartProductDocument,
    variables: {
      cartProductId,
    },
    cache: "no-store",
  });

  if (!data) return;
  return data;
};

export const updateProductQuantity = async ({
  cartProductId,
  quantity,
}: {
  cartProductId: string;
  quantity: number;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: UpdateCartQuantityDocument,
    variables: {
      quantity,
      cartProductId,
    },
    cache: "no-store",
  });

  if (!data) return;
  return data;
};

export const createFavoriteProduct = async ({
  email,
  slug,
}: {
  email: string;
  slug: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: CreateFavoriteProductDocument,
    variables: {
      email,
      slug,
    },
    cache: "no-store",
  });

  return data;
};

export const getFavoriteProduct = async ({
  email,
  slug,
}: {
  email: string | undefined | null;
  slug: string;
}) => {
  if (!email) return;

  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: GetFavoriteProductDocument,
    variables: {
      email,
      slug,
    },
    cache: "no-store",
  });
  console.log(data);
  return data;
};

export const getFavorites = async ({
  email,
}: {
  email: string | undefined | null;
}) => {
  if (!email) return;

  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: GetFavoritesDocument,
    variables: {
      email,
    },
    cache: "no-store",
  });
  console.log(data);
  return data;
};

export const deleteFavoriteProduct = async ({
  favoriteProductId,
}: {
  favoriteProductId: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: DeleteFavoriteProductDocument,
    variables: {
      favoriteProductId,
    },
    cache: "no-store",
  });

  if (!data) return;
  return data;
};

export const createCartProduct = async ({
  cartId,
  quantity,
  slug,
}: {
  cartId: string;
  quantity: number;
  slug: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: CreateCartProductDocument,
    variables: {
      quantity,
      cartId,
      slug,
    },
    cache: "no-store",
  });

  if (!data) return;
  return data;
};

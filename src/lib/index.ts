import { getEnv } from "@/utils";
import {
  CreateAccountDocument,
  CreateCartAuthorizedDocument,
  CreateCartUnAuthorizedDocument,
  DeleteCartProductDocument,
  GetAccountDocument,
  GetCartByIdDocument,
  GetProductBySlugDocument,
  GetProductsDocument,
  TypedDocumentString,
  UpdateCartProductDocument,
  UpdateCartQuantityDocument,
} from "./hygraph/generated/graphql";
import { connect } from "http2";
import { mapperGetCart } from "./mappers/getCart";

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

export const createCartAuthorized = async ({
  quantity,
  slug,
  email,
}: {
  slug: string;
  quantity: number;
  email: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: CreateCartAuthorizedDocument,
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

export const createCartUnAuthorized = async ({
  quantity,
  slug,
}: {
  slug: string;
  quantity: number;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: CreateCartUnAuthorizedDocument,
    variables: {
      quantity,
      slug,
    },
    cache: "no-store",
  });
  if (!data) throw new Error("Problem with creating unauthorized cart");
  return data.createCart;
};

export const getCart = async ({ id }: { id: string }) => {
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
  console.log(data.cart);
  if (!data.cart) return;
  return mapperGetCart(data.cart);
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

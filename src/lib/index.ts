import { getServerSession } from "next-auth";

import {
  CreateAccountDocument,
  CreateCartDocument,
  CreateCartProductDocument,
  CreateCartUnauthorizedDocument,
  CreateFavoriteProductDocument,
  CreateOrderDocument,
  CreateProductReviewDocument,
  DeleteCartProductDocument,
  DeleteFavoriteProductDocument,
  GetAccountDocument,
  GetCartByIdDocument,
  GetCategoriesDocument,
  GetFavoriteProductDocument,
  GetFavoritesDocument,
  GetOrdersByFiltersDocument,
  GetOrdersDocument,
  GetProductBySlugDocument,
  GetProductsByCategoryDocument,
  GetProductsDocument,
  PublishProductReviewDocument,
  UpdateCartProductDocument,
  UpdateCartQuantityDocument,
  UpdateOrderDocument,
} from "./hygraph/generated/graphql";
import { mapperGetCart } from "./mappers/getCart";
import { mapperCategories } from "./mappers/getCategories";
import { mapperGetFavorites } from "./mappers/getFavorites";
import { mapperGetOrders } from "./mappers/getOrders";

import { getEnv } from "@/utils";

import type {
  OrderStatus,
  TypedDocumentString,
} from "./hygraph/generated/graphql";

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
  size,
}: {
  slug: string;
  quantity: number;
  email: string | undefined;
  size: string;
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
      size,
    },
    cache: "no-store",
  });
  if (!data) throw new Error("Problem with creating authorized cart");
  return data.createCart;
};

export const getCart = async ({ id }: { id: string | undefined }) => {
  if (!id) {
    return;
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
  return mapperGetCart(data.cart);
};

export const updateCartProduct = async ({
  quantity,
  cartProductId,
  size,
}: {
  quantity: number;
  cartProductId: string;
  size: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: UpdateCartProductDocument,
    variables: {
      quantity,
      cartProductId,
      size,
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

export const getFavoriteProducts = async ({
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
    next: { tags: ["getFavoriteProducts"] },
  });

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

  return mapperGetFavorites(data);
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
  size,
}: {
  cartId: string;
  quantity: number;
  slug: string;
  size: string;
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
      size,
    },
    cache: "no-store",
  });

  if (!data) return;
  return data;
};

export const createOrderHygraph = async ({
  email,
  stripeCheckoutId,
  orderStatus,
  total,
  orderItems,
}: {
  email: string | undefined | null;
  stripeCheckoutId: string;
  total: number;
  orderStatus: OrderStatus;
  orderItems: {
    productId: string;
    total: number;
    quantity: number;
    size: string;
  }[];
}) => {
  if (!email) return;

  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: CreateOrderDocument,
    variables: {
      orderStatus,
      email,
      stripeCheckoutId,
      total,
      orderItems: orderItems.map((item) => ({
        product: { connect: { id: item.productId } },
        quantity: item.quantity,
        size: item.size,
        total: item.total,
      })),
    },
    cache: "no-store",
  });

  return data;
};

export const getOrders = async () => {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (!userEmail) return { error: "You are not logged in" };

  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: GetOrdersDocument,
    variables: {
      email: userEmail,
    },
    cache: "no-store",
  });

  if (!data) return;
  return mapperGetOrders(data.orders);
};

export const updateOrderStatus = async ({
  stripeCheckoutId,
  orderStatus,
}: {
  stripeCheckoutId: string;
  orderStatus: OrderStatus;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: UpdateOrderDocument,
    variables: {
      stripeCheckoutId,
      orderStatus,
    },
    cache: "no-store",
  });

  if (!data) return;
  return data;
};

export const getCategories = async () => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: GetCategoriesDocument,
    variables: {},
    cache: "no-store",
  });

  if (!data) return;

  return mapperCategories(data.categories);
};

export const publishProductReview = async (id: string | undefined) => {
  if (!id) {
    throw new Error("ID is undefined or null");
  }
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: PublishProductReviewDocument,
    variables: { id },
    cache: "no-store",
  });

  if (!data) return;
  return data;
};

export const createProductReview = async ({
  email,
  name,
  slug,
  content,
  date,
}: {
  email: string;
  name: string;
  slug: string;
  content: string;
  date: string;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: CreateProductReviewDocument,
    variables: { email, name, slug, content, date },
    cache: "no-store",
  });

  if (!data) return;
  if (data) {
    await publishProductReview(data.createReview?.id);
  }
};

export const getOrdersByFilters = async ({
  minPrice,
  maxPrice,
  status,
  startDate,
  endDate,
  email,
}: {
  email: string;
  startDate: string | undefined;
  endDate: string;
  minPrice: number;
  maxPrice: number;
  status: OrderStatus;
}) => {
  const data = await fetcher({
    headers: {
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
    query: GetOrdersByFiltersDocument,
    variables: {
      email: email,
      startDate: startDate ?? new Date(-8640000000000000).toISOString(),
      endDate: endDate ?? new Date().toISOString(),
      minPrice: minPrice ?? 1,
      maxPrice: maxPrice ?? Number.MAX_SAFE_INTEGER,
      status: status,
    },
    cache: "no-store",
  });

  if (!data) return;
  return mapperGetOrders(data.orders);
};

export const getProductsByCategory = async ({
  categoryName,
}: {
  categoryName: string;
}) => {
  const data = await fetcher({
    query: GetProductsByCategoryDocument,
    variables: {
      categoryName,
    },
    cache: "no-store",
  });
  if (!data) throw new Error("Problem with fetching products");
  return data;
};

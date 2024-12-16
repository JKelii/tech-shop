import type { OrderStatus } from "../hygraph/generated/graphql";

export type ParamGetOrders = {
  total: number;
  stripeCheckoutId: string;
  createdAt: string;
  orderStatus: OrderStatus;
  id: string;
  orderItems: Array<{
    size?: string | null;
    quantity: number;
    product?: {
      slug: string;
      name: string;
      price: number;
      images: Array<{
        url: string;
        fileName: string;
      }>;
    } | null;
  }>;
}[];

export type MappedGetOrders = Array<{
  total: number;
  stripeCheckoutId: string;
  createdAt: string;
  orderStatus: OrderStatus;
  id: string;
  orderItems: OrderItemsType[];
}>;

type OrderItemsType = {
  size: string;
  quantity: number;
  product: {
    slug: string;
    name: string;
    price: number;
    image: string;
  };
};

export const mapperGetOrders = (
  orders: ParamGetOrders,
): MappedGetOrders | undefined => {
  if (!orders || orders === null) return undefined;

  return orders.map((order) => {
    return {
      total: order.total,
      stripeCheckoutId: order.stripeCheckoutId,
      createdAt: order.createdAt,
      orderStatus: order.orderStatus,
      id: order.id,
      orderItems: order.orderItems
        .map((item) => {
          if (item?.product) {
            return {
              size: item.size,
              quantity: item.quantity,
              product: {
                name: item.product.name,
                slug: item.product.slug,
                price: item.product.price,
                image: item.product.images[0].url,
              },
            };
          }
        })
        .filter((v): v is OrderItemsType => Boolean(v)),
    };
  });
};

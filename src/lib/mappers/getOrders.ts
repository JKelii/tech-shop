type MappedGetOrders = {
  orders: {
    orderItems: {
      size: string | null | undefined;
      quantity: number;
      product: {
        id: string;
        images: { url: string }[];
        price: number;
        name: string;
        slug: string;
      };
    }[];
  }[];
} | null;

type ResponseGetOrders = {
  size: string | null | undefined;
  product: {
    id: string;
    image: string;
    price: number;
    name: string;
    slug: string;
  };
}[];

export const mapperGetOrders = (
  orders: MappedGetOrders
): ResponseGetOrders | undefined => {
  if (!orders || orders.orders.length === 0) return undefined;

  return orders.orders.flatMap((order) =>
    order.orderItems.map((item) => ({
      size: item.size,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        image: item.product.images[0]?.url,
        price: item.product.price,
        name: item.product.name,
        slug: item.product.slug,
      },
    }))
  );
};

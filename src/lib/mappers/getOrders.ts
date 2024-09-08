type MappedGetOrders = {
  orders: Array<{
    total: number;
    stripeCheckoutId: string;
    createdAt: string;
    orderItems: Array<{
      product: {
        id: string;
        slug: string;
        name: string;
        price: number;
        description: string;
        images: Array<{
          url: string;
          fileName: string;
        }>;
      };
    }>;
  }>;
} | null;

type ResponseGetOrders = {
  id: string;
  image: string;
  price: number;
  name: string;
  slug: string;
}[];

export const mapperGetOrders = (
  orders: MappedGetOrders
): ResponseGetOrders[] | undefined => {
  if (!orders || orders.orders.length === 0) return undefined;

  const filteredOrders = orders.orders.map((order) =>
    order.orderItems.map((item) => item.product)
  );

  filteredOrders
    .map((item) =>
      item.map((item) => {
        if (item) {
          return {
            id: item.id,
            image: item.images[0].url,
            price: item.price,
            name: item.name,
            slug: item.slug,
          };
        }
      })
    )
    .filter((v): v is ResponseGetOrders => Boolean(v));
};

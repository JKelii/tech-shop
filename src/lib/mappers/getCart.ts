type MappedGetCart =
  | {
      cartProduct: Array<{
        id: string;
        quantity: number;
        size?: string | null | undefined;
        product?: {
          id: string;
          slug: string;
          name: string;
          price: number;
          images: Array<{
            url: string;
          }>;
        } | null;
      }>;
    }
  | undefined;

export type ResponseGetCart = {
  id: string;
  quantity: number;
  image: string;
  price: number;
  size: string;
  name: string;
  slug: string;
  productId: string;
};

export const mapperGetCart = (
  cart: MappedGetCart,
): ResponseGetCart[] | undefined => {
  if (!cart || cart === null) return undefined;

  return cart.cartProduct
    .map(({ size, quantity, id, product }) => {
      if (product) {
        return {
          id,
          quantity,
          productId: product.id,
          size: size,
          image: product.images[0]?.url,
          price: product.price,
          name: product.name,
          slug: product.slug,
        };
      }
    })
    .filter((v): v is ResponseGetCart => Boolean(v));
};

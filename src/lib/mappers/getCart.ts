type MappedGetCart =
  | {
      cartProduct: Array<{
        id: string;
        quantity: number;
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
  name: string;
  slug: string;
  productId: string;
};

export const mapperGetCart = (
  cart: MappedGetCart
): ResponseGetCart[] | undefined => {
  if (!cart || cart === null) return undefined;

  return cart.cartProduct
    .map(({ quantity, id, product }) => {
      if (product) {
        return {
          quantity,
          productId: id,
          image: product?.images[0].url,
          price: product?.price,
          name: product?.name,
          slug: product?.slug,
          id: product.id,
        };
      }
    })
    .filter((v): v is ResponseGetCart => Boolean(v));
};

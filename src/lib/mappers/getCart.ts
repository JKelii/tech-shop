type MappedGetCart =
  | {
      cartProduct: Array<{
        id: string;
        quantity: number;
        product?: {
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

type ResponseGetCart = {
  id: string;
  quantity: number;
  image: string;
  price: number;
  name: string;
  slug: string;
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
          image: product?.images[0].url,
          price: product?.price,
          name: product?.name,
          slug: product?.slug,
          id,
        };
      }
    })
    .filter((v): v is ResponseGetCart => Boolean(v));
};

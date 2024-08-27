import { ProductInCart } from "@/contexts/ShopContext/CartContext";

type MappedGetCart =
  | {
      cartProducts: Array<{
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

export const mapperGetCart = (
  cart: MappedGetCart
): ProductInCart[] | undefined => {
  if (!cart || cart === null) return undefined;

  return cart.cartProducts
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
    .filter((v): v is ProductInCart => Boolean(v));
};

type MappedGetFavorites =
  | {
      favoriteProducts: Array<{
        id: string;
        product?: {
          id: string;
          slug: string;
          name: string;
          price: number;
          description: string;
          images: Array<{
            url: string;
            fileName: string;
          }>;
        } | null;
      }>;
    }
  | undefined;

export type ResponseGetFavorites = {
  favoriteId: string;
  product: {
    id: string;
    image: string;
    price: number;
    name: string;
    slug: string;
    description: string;
  };
};

export const mapperGetFavorites = (
  favorite: MappedGetFavorites,
): ResponseGetFavorites[] | undefined => {
  if (!favorite || favorite === null) return undefined;

  return favorite.favoriteProducts
    .map(({ id, product }) => {
      if (product) {
        return {
          favoriteId: id,
          product: {
            description: product.description,
            image: product?.images[0].url,
            price: product?.price,
            name: product?.name,
            slug: product?.slug,
            id: product.id,
          },
        };
      }
    })
    .filter((v): v is ResponseGetFavorites => Boolean(v));
};

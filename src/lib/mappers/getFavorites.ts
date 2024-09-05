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

type ResponseGetFavorites = {
  id: string;
  image: string;
  price: number;
  name: string;
  slug: string;
  description: string;
};

export const mapperGetFavorites = (
  favorite: MappedGetFavorites
): ResponseGetFavorites[] | undefined => {
  if (!favorite || favorite === null) return undefined;

  return favorite.favoriteProducts
    .map(({ id, product }) => {
      if (product) {
        return {
          image: product?.images[0].url,
          price: product?.price,
          name: product?.name,
          description: product.description,
          slug: product?.slug,
          id: product.id,
        };
      }
    })
    .filter((v): v is ResponseGetFavorites => Boolean(v));
};

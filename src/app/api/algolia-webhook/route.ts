import { getAllProducts } from "@/lib";
import { getEnv } from "@/utils";
import { algoliasearch } from "algoliasearch";

const algoliaId = getEnv(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID);
const algoliaKey = getEnv(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

export const algoliaHandler = () => {
  const client = algoliasearch(algoliaId, algoliaKey);

  const processRecords = async () => {
    try {
      const products = (await getAllProducts()).products;
      return await client.saveObjects({
        indexName: "products",
        objects: products.map((product) => ({
          objectID: product.id,
          categories: product.categories,
          name: product.name,
          slug: product.slug,
          images: product.images[0].url,
          price: product.price,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  };

  processRecords();
};

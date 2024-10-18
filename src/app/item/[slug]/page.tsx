import { ProductPage } from "@/components/pages/Product/ProductPage";
import { getFavoriteProducts, getProductSlug } from "@/lib";
import NotFound from "./not-found";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import {
  createLastSeenCookie,
  getProductsFromCookies,
} from "@/actions/lastSeen";
import SaveInCookiesDiv from "@/components/pages/Product/components/SaveInCookiesDiv";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { product } = await getProductSlug({ slug: params.slug });

  if (!product) {
    return {
      title: "product not found",
    };
  }

  return {
    title: {
      template: product.name,
      default: product.name,
    },
    description: product.description,
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const session = await getServerSession();
  const { product } = await getProductSlug({ slug });
  const lastSeen = await getProductsFromCookies();
  const responseFavorite = await getFavoriteProducts({
    email: session?.user?.email,
    slug,
  });
  if (!product) return <NotFound />;
  //TODO: Create component

  return (
    <>
      <ProductPage
        product={product}
        slug={slug}
        // lastSeen={lastSeen}
        favoriteId={responseFavorite?.favoriteProducts[0]?.id}
      />
    </>
  );
};

export default Page;

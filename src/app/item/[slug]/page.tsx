import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

import NotFound from "./not-found";

import { ProductSkeleton } from "@/components/pages/Product/components/ProductSkeleton";
import { SaveProductInLastSeen } from "@/components/pages/Product/components/SaveProductInLastSeen";

import { getLastSeenFromCookies } from "@/actions/lastSeen";
import { getFavoriteProducts, getProductSlug } from "@/lib";

import type { Metadata } from "next";

const DynamicProduct = dynamic(
  () => import("../../../components/pages/Product/components/ProductPage"),
  {
    loading: () => <ProductSkeleton />,
  },
);

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getProductSlug({ slug: slug });

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
  const { slug } = await params;
  const session = await getServerSession();
  const { product } = await getProductSlug({ slug });
  const lastSeenItems = await getLastSeenFromCookies();
  const responseFavorite = await getFavoriteProducts({
    email: session?.user?.email,
    slug,
  });

  if (!product) return <NotFound />;

  return (
    <>
      <SaveProductInLastSeen slug={slug} />
      <DynamicProduct
        product={product}
        lastSeenItems={lastSeenItems}
        slug={slug}
        favoriteId={responseFavorite?.favoriteProducts[0]?.id}
      />
    </>
  );
};

export default Page;

import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

import NotFound from "./not-found";

import { ProductSkeleton } from "@/components/pages/Product/components/ProductSkeleton";
import { SaveProductInLastSeen } from "@/components/pages/Product/components/SaveProductInLastSeen";

import { getLastSeenFromCookies } from "@/actions/lastSeen";
import { getFavoriteProducts, getProductSlug } from "@/lib";

const DynamicProduct = dynamic(
  () => import("../../../components/pages/Product/components/ProductPage"),
  {
    loading: () => <ProductSkeleton />,
  },
);

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
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

import { getFavoriteProducts, getProductSlug } from "@/lib";
import NotFound from "./not-found";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { SaveProductInLastSeen } from "@/components/pages/Product/components/SaveProductInLastSeen";
import { getLastSeenFromCookies } from "@/actions/lastSeen";
import dynamic from "next/dynamic";
import { ProductSkeleton } from "@/components/pages/Product/components/ProductSkeleton";

const DynamicProduct = dynamic(
  () => import("../../../components/pages/Product/components/ProductPage"),
  {
    loading: () => <ProductSkeleton />,
  }
);

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

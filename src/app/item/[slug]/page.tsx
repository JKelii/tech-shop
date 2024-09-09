import { ProductPage } from "@/components/pages/Product/ProductPage";
import { getFavoriteProduct, getProductSlug } from "@/lib";
import NotFound from "./not-found";
import { getServerSession } from "next-auth";
import { Metadata } from "next";

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
    title: product.name,
    description: product.description,
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const session = await getServerSession();
  const { product } = await getProductSlug({ slug });

  const responseFavorite = await getFavoriteProduct({
    email: session?.user?.email,
    slug,
  });

  if (!product) return <NotFound />;
  return (
    <ProductPage
      product={product}
      slug={slug}
      favoriteId={responseFavorite?.favoriteProducts[0]?.id}
    />
  );
};

export default Page;

import { ProductPage } from "@/components/pages/Product/ProductPage";
import { getProductSlug } from "@/lib";
import NotFound from "./not-found";

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const { product } = await getProductSlug({ slug });
  if (!product) return <NotFound />;
  return <ProductPage product={product} />;
};
export default Page;

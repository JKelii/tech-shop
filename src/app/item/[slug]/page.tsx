import { getProductSlug } from "@/lib";

const page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const { product } = await getProductSlug({ slug });

  return (
    <div className="flex flex-col justify-center items-center">
      <p>{product?.name}</p>
    </div>
  );
};

export default page;

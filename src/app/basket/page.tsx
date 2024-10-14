import { getCart } from "@/lib";
import { cookies } from "next/headers";
import { CheckoutButton } from "@/components/pages/Basket/CheckoutButton";
import BasketItems from "@/components/pages/Basket/BasketItems";
import { getServerSession } from "next-auth";

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const session = getServerSession();
  const cart = await getCart({ id: cookies().get("cart")?.value });
  return (
    <main className="min-h-screen container mx-auto flex justify-start items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <BasketItems cart={cart} />

      <div className="flex justify-center items-center w-full ">
        <CheckoutButton cart={cart} />
      </div>
    </main>
  );
};

export default Page;

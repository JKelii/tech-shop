import { cookies } from "next/headers";

import BasketItems from "@/components/pages/Basket/BasketItems";
import { CheckoutButton } from "@/components/pages/Basket/CheckoutButton";

import { getCart } from "@/lib";

const Page = async () => {
  const cart = await getCart({ id: (await cookies()).get("cart")?.value });
  return (
    <main className="container mx-auto mb-8 mt-4 flex grow flex-col  items-center justify-start gap-12 rounded-lg border-2 border-gray-200 bg-gray-100/50 py-10 shadow-md">
      <BasketItems cart={cart} />

      <div className="flex w-full items-center justify-center ">
        <CheckoutButton cart={cart} />
      </div>
    </main>
  );
};

export default Page;

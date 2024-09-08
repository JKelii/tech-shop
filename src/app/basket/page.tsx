import Image from "next/image";
import { X } from "lucide-react";
import { getSession, useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { getCart } from "@/lib";
import { cookies } from "next/headers";
import { createOrder } from "@/actions/order";
import { CheckoutButton } from "@/components/pages/Basket/CheckoutButton";
import { removeFromCart } from "@/actions/cart";
import BasketItems from "@/components/pages/Basket/BasketItems";
import { toast } from "@/components/ui/use-toast";
import { getServerSession } from "next-auth";

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const session = getServerSession();
  const cart = await getCart({ id: cookies().get("cart")?.value });
  console.log(cart);

  return (
    <main className="min-h-screen container mx-auto flex justify-center items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <p className="font-bold text-3xl">
        {/* Total price: {priceUpdate(totalPrice)} */}
      </p>
      <BasketItems cart={cart} />
      <div className="flex justify-center items-center w-full ">
        <CheckoutButton />
      </div>
    </main>
  );
};

export default Page;

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

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const session = getSession();
  const cart = await getCart({ id: cookies().get("cart")?.value });
  console.log(cart);

  //TODO: Change toaster so useEffect doesn't reload
  // const handleDelete = async (productSlug: string) => {
  //   toast({
  //     title: "Item removed from cart ❌",
  //     className: "bg-red-500/15",
  //     duration: 3000,
  //   });
  // };
  // const updatedCart = await removeFromCart({
  //   product: { slug: slug, quantity: 1 },
  //   // email: session.data?.user?.email,
  // });
  // //   if (updatedCart !== null) {
  // //     setCart(updatedCart);
  // //   } else {
  // //     setCart([]);
  // //   }
  // //   setQuantity(0);
  // // // };

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

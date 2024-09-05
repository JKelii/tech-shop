import Image from "next/image";
import { X } from "lucide-react";
import { getSession } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { getCart } from "@/lib";
import { cookies } from "next/headers";
import { createOrder } from "@/actions/order";
import { CheckoutButton } from "@/components/pages/Basket/CheckoutButton";

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
      <CheckoutButton />
      <p className="font-bold text-3xl">
        {/* Total price: {priceUpdate(totalPrice)} */}
      </p>
      {cart?.map((product) => (
        <div
          key={product.slug}
          className="flex justify-center items-center gap-12 mt-10 p-4 border-2 border-black rounded-md"
        >
          <Image
            src={product?.image}
            alt={product?.name}
            width={100}
            height={100}
            quality={100}
            className="border-2 border-gray-500 rounded-md"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semi-bold">
              Quantity: {product.quantity}
            </p>

            <div className="flx-col">
              <p className="text-lg">
                Size: <strong>?</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg">{product?.name}</p>
            <p className="text-black text-xl text-center">
              {/* {priceUpdate(product?.price * product.quantity)} */}
            </p>
          </div>
          <button>
            <X className="cursor-pointer" />
          </button>
          <Toaster style="text-red-500" />
        </div>
      ))}
    </main>
  );
};

export default Page;

import { manageCart, ManageCartParams } from "@/actions/cart";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { startTransition, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Toaster } from "./ui/toaster";
import { Button } from "./ui/button";
import { SizeRadioGroup } from "./pages/Product/components/SizeRadioGroup";
import { useQuantityProduct } from "./pages/Product/hooks/useQuantityProduct";
import { toast } from "sonner";
import { ThreeDots } from "react-loader-spinner";

type AddToCartType = {
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  productQuantity: number;
};

export const AddToCartButton = ({ slug, productQuantity }: AddToCartType) => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit } = useForm();
  const session = useSession();

  const {
    depriveQuantity,
    addQuantity,
    selectedQuantity,
    setSelectedQuantity,
  } = useQuantityProduct();

  const outOfStock = selectedQuantity > productQuantity;
  if (outOfStock) {
    setSelectedQuantity(productQuantity);
  }

  const onSubmit = handleSubmit(async () => {
    if (selectedQuantity < productQuantity) {
      startTransition(async () => {
        await manageCart({
          product: { slug, quantity: selectedQuantity },
          email: session.data?.email,
        });

        if (selectedQuantity > 1) {
          toast("Items added to cart ✅");
        } else {
          toast("Item added to cart ✅");
        }
      });
    }
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          {productQuantity} available
        </p>
        {/* <SizeRadioGroup /> */}
        <div className="flex gap-2">
          <p className="text-lg font-medium">Quantity:</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={depriveQuantity}
              className="border-[1px] border-gray-500 w-6 rounded-sm hover:bg-gray-200"
            >
              -
            </button>
            <p className="w-4 text-center font-semibold">{selectedQuantity}</p>
            <button
              type="button"
              onClick={addQuantity}
              className="border-[1px] border-gray-500 w-6 rounded-sm hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <Button
        disabled={isPending || outOfStock}
        type="submit"
        className=" bg-black shadow-lg hover:translate-y-[2px] text-white font-bold h-12 py-2 px-4 rounded w-36 md:w-44 mt-6 mr-4"
      >
        <div className="flex justify-center items-center gap-2 md:gap-4 self-center">
          <ShoppingCart size={20} />
          {isPending ? (
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#fff"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <p>Add to cart</p>
          )}
        </div>
      </Button>
      <Toaster style="text-green-600" />
    </form>
  );
};

export default AddToCartButton;

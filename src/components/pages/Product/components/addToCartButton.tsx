import { manageCart, ManageCartParams } from "@/actions/cart";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { startTransition, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ProductType } from "./ProductPage";
import { useRouter } from "next/navigation";
import { useQuantityProduct } from "../hooks/useQuantityProduct";
import { useSelectedSize } from "../hooks/useSelectedSize";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ThreeDots } from "react-loader-spinner";
import { Toaster } from "@/components/ui/toaster";
import { SizeRadioGroup } from "./SizeRadioGroup";

export const AddToCartButton = ({ product }: { product: ProductType }) => {
  const { slug, quantity: productQuantity, size } = product;
  const [isPending, startTransition] = useTransition();
  const { handleSubmit } = useForm();
  const session = useSession();
  const router = useRouter();
  const {
    depriveQuantity,
    addQuantity,
    selectedQuantity,
    setSelectedQuantity,
  } = useQuantityProduct();

  const { selectedSize, onSizeSelect } = useSelectedSize();

  const onSubmit = handleSubmit(async () => {
    try {
      const res = startTransition(async () => {
        if (selectedSize) {
          await manageCart({
            product: { size: selectedSize, slug, quantity: selectedQuantity },
            email: session.data?.email,
          });
        }
        if (res !== null) {
          if (selectedQuantity > 1) {
            toast("Items added to cart ✅");
          } else {
            toast("Item added to cart ✅");
          }
        }
      });
      router.refresh();
    } catch (error) {
      console.error("Can't add item to cart", error);
    }
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="flex flex-col ">
        <SizeRadioGroup
          product={product}
          selectedSize={selectedSize}
          onSizeSelect={onSizeSelect}
        />
        <div className="flex gap-2 justify-center items-center">
          <p className="text-lg font-medium">Quantity:</p>
          <div className="flex gap-2 items-center border rounded-md bg-white">
            <Button
              type="button"
              size="icon"
              variant={"ghost"}
              disabled={selectedQuantity === 1}
              onClick={depriveQuantity}
              className=" text-black  w-8 rounded-sm hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-2 py-2  w-8 text-center font-semibold">
              {selectedQuantity}
            </span>
            <Button
              type="button"
              size="icon"
              variant={"ghost"}
              onClick={addQuantity}
              className="text-black w-8 rounded-sm  hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        disabled={isPending || !selectedSize}
        type="submit"
        className=" bg-black hover:bg-black/90 shadow-lg hover:translate-y-[1px] text-white font-bold h-12 py-2 px-4 rounded w-36 md:w-44 mt-6 mr-4"
      >
        <div className="flex justify-center items-center gap-2 md:gap-4 self-center">
          {isPending ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-full w-full animate-spin" />
              Please wait
            </Button>
          ) : (
            <>
              <ShoppingCart size={20} /> <p>Add to cart</p>
            </>
          )}
        </div>
      </Button>
      <Toaster style="text-green-600" />
    </form>
  );
};

export default AddToCartButton;

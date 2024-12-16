import { yupResolver } from "@hookform/resolvers/yup";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useQuantityProduct } from "../hooks/useQuantityProduct";
import { useSelectedSize } from "../hooks/useSelectedSize";
import { SizeRadioGroup } from "./SizeRadioGroup";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

import { manageCart } from "@/actions/cart";
import { addToCartSchema } from "@/app/schema/addToCartValidation";

import type { ProductType } from "./ProductPage";

export const AddToCartButton = ({ product }: { product: ProductType }) => {
  const { slug } = product;
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(addToCartSchema),
  });
  const session = useSession();
  const router = useRouter();

  const { depriveQuantity, addQuantity, selectedQuantity } =
    useQuantityProduct();

  const { selectedSize, onSizeSelect } = useSelectedSize();

  const onSubmit = handleSubmit(() => {
    try {
      startTransition(async () => {
        if (selectedSize) {
          await manageCart({
            product: { size: selectedSize, slug, quantity: selectedQuantity },
            email: session.data?.email,
          });
        }
        if (selectedQuantity > 1) {
          toast("Items added to cart ✅");
        } else {
          toast("Item added to cart ✅");
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
          trigger={trigger}
          setValue={setValue}
          errors={errors}
          register={register}
          product={product}
          selectedSize={selectedSize}
          onSizeSelect={onSizeSelect}
        />

        <div className="flex items-center justify-center gap-2">
          <p className="md:text-md text-sm font-medium lg:text-lg ">
            Quantity:
          </p>
          <div className="flex items-center gap-2 rounded-md border bg-white">
            <Button
              type="button"
              size="icon"
              variant={"ghost"}
              disabled={selectedQuantity === 1}
              onClick={depriveQuantity}
              className=" w-8  rounded-sm text-black hover:bg-gray-100"
            >
              <Minus className="size-4" />
            </Button>
            <span className="w-8 p-2  text-center font-semibold">
              {selectedQuantity}
            </span>
            <Button
              type="button"
              size="icon"
              variant={"ghost"}
              onClick={addQuantity}
              className="w-8 rounded-sm text-black  hover:bg-gray-100"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className=" mr-4 mt-6 h-12 w-36 rounded bg-black px-4 py-2 font-bold text-white shadow-lg hover:translate-y-px hover:bg-black/90 md:w-44"
      >
        <div className="flex items-center justify-center gap-2 self-center md:gap-4">
          {isPending ? (
            <>
              <ReloadIcon className="mr-2 size-full animate-spin" />
              <p>Please wait</p>
            </>
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

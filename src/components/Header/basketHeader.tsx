import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const BasketHeader = async ({ styles }: { styles?: string }) => {
  return (
    <>
      <Link href="/basket">
        <div className={cn("flex justify-center items-center p-1", styles)}>
          <ShoppingCart className=" size-6  p-0  hover:text-black/80 text-black items-center lg:hover:-translate-y-[0.8px] mb-1" />
        </div>
      </Link>
    </>
  );
};

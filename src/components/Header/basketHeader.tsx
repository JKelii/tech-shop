import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const BasketHeader = ({ styles }: { styles?: string }) => {
  return (
    <>
      <Link href="/basket">
        <div className={cn("flex justify-center items-center p-1", styles)}>
          <ShoppingCart className=" mb-1  size-6  items-center p-0 text-black hover:text-black/80 lg:hover:translate-y-[-0.8px]" />
        </div>
      </Link>
    </>
  );
};

import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const BasketHeader = async ({ styles }: { styles?: string }) => {
  return (
    <>
      <Link href="/basket">
        <div className="flex ml-1 flex-col duration-300 justify-center hover:text-black/80 text-black items-center lg:hover:-translate-y-[0.8px] rounded-lg  ">
          <div className={cn("flex justify-center items-center mt-1", styles)}>
            <span>
              <ShoppingCart className=" size-6  p-0 " />
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

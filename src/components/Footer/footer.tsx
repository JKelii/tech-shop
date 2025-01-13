import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex  h-16 w-full min-w-[380px] items-center justify-center border-2 border-gray-200 shadow-md">
      <div className="  container flex flex-row items-center justify-between gap-4 ">
        <Link
          href={"/"}
          className="hidden items-center justify-center gap-2 md:flex"
        >
          <ShoppingBasket className="size-6 text-gray-400" />
          <p className="text-sm text-gray-400">TechShop</p>
        </Link>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-gray-400 hover:underline"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className="text-gray-400 hover:underline"
            prefetch={false}
          >
            Favorites
          </Link>

          <Link
            href="/contact"
            className="text-gray-400 hover:underline"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="text-gray-400 hover:underline"
            prefetch={false}
          >
            Account
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TechShop. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

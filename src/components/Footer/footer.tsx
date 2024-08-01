import { MountainIcon, ShoppingBasket } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-16  border-2 border-gray-200 shadow-md w-full rounded-t-lg flex justify-center items-center ">
      <div className="container flex flex-row items-center justify-between gap-4 ">
        <Link href={"/"} className="flex flex-col justify-center items-center ">
          <ShoppingBasket className="w-6 h-6 text-gray-400" />
          <p className="text-gray-400 text-sm">TechShop</p>
        </Link>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/"
            className="hover:underline text-gray-400"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className="hover:underline text-gray-400"
            prefetch={false}
          >
            Favorites
          </Link>

          <Link
            href="/contact"
            className="hover:underline text-gray-400"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="hover:underline text-gray-400"
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

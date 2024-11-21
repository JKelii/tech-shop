import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export const PlatformLinks = () => {
  return (
    <ul className="flex gap-4 mt-4">
      <li aria-label="Instagram link">
        <Link href="https://www.instagram.com">
          <Instagram className="text-gray-600" />
        </Link>
      </li>
      <li aria-label="Facebook link">
        <Link href="https://www.facebook.com">
          <Facebook className="text-gray-600" />
        </Link>
      </li>
      <li aria-label="Twitter link">
        <Link href="https://www.twitter.com">
          <Twitter className="text-gray-600" />
        </Link>
      </li>
    </ul>
  );
};

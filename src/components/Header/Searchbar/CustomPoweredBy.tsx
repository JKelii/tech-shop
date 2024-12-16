import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CustomPoweredBy = () => {
  return (
    <>
      <Link
        className="flex items-center justify-center gap-2 "
        href={"https://www.algolia.com"}
      >
        <p className="text-sm text-black">Search by</p>
        <Image
          src="/Algolia-logo-blue.png"
          alt="algolia"
          width={70}
          height={70}
        />
      </Link>
    </>
  );
};

import Image from "next/image";
import React from "react";

export const ProductOfferLazyImage = ({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={175}
      height={175}
      className="w-[175px] h-[175px] rounded-lg"
      style={{ objectFit: "contain" }}
      loading="lazy"
    />
  );
};

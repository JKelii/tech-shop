import Image from "next/image";
import React from "react";

export const ProductOfferLazyImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={175}
      height={175}
      className="size-[175px] rounded-lg"
      style={{ objectFit: "contain" }}
      loading="lazy"
    />
  );
};

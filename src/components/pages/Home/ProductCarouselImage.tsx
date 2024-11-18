import Image from "next/image";
import React from "react";

export const ProductCarouselImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <Image
      width={300}
      height={300}
      alt={alt}
      src={src}
      className="w-full h-full object-cover"
    />
  );
};

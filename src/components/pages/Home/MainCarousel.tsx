"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";
import { getAllProducts } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import SwiperNavButtons from "./SwiperNavButtons";

export const MainCarousel = async () => {
  const { products } = await getAllProducts();

  return (
    <div className="flex items-center justify-center flex-col w-full h-full">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] "
      >
        {products.slice(0, 6).map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={`/item/${item.slug}`} className=" hover:bg-black/10 ">
              <div className="flex flex-col border-2 border-zinc-500 gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[280px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-cover bg-center">
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    width={300}
                    height={300}
                    priority
                    className="w-full h-[330px] absolute"
                  />
                  <p
                    className="absolute inset-x-0 bottom-10 ml-2 text-xl z-10 mt-2 text-center text-black
                   font-bold"
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

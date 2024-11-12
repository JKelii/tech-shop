import React from "react";
import MainOffer from "./mainOffer";
import { LazyMainComponents } from "./LazyMainComponents";

export const MainPage = () => {
  return (
    <>
      <article className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-semibold">Welcome to TechShop</h1>
        <p className="text-xl text-gray-700/80">
          Discover the latest in technology and gadgets
        </p>
      </article>
      <div className="h-full w-full rounded-lg ">
        <MainOffer />
        <LazyMainComponents />
      </div>
    </>
  );
};

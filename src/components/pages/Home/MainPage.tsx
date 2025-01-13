import React from "react";

import { MainComponents } from "./MainComponents";
import MainOffer from "./mainOffer";

export const MainPage = () => {
  return (
    <>
      <article className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">Welcome to TechShop</h1>
        <p className="text-xl text-gray-700/80">
          Discover the latest in technology and gadgets
        </p>
      </article>
      <div className="size-full rounded-lg p-4">
        <MainOffer />
        <MainComponents />
      </div>
    </>
  );
};

"use client";
import Image from "next/image";
import React from "react";

const OrderSummary = () => {
  return (
    <article className="flex flex-col gap-8">
      <h2 className="text-black font-bold text-xl">Order Summary</h2>
      <div className="flex justify-center items-center gap-8">
        <Image width={50} height={50} src="" alt="photo" />
        <div className="flex-col ">
          <p>Hoodie</p>
          <div className="flex gap-8">
            <p>Color: Black</p>
            <p>Size: L</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p>Subtotal:</p>
        <p>0.00$</p>
      </div>
      <div className="flex justify-between">
        <p>Shipping:</p>
        <p>0.00$</p>
      </div>
      <div className="flex justify-between">
        <p>Total:</p>
        <p>0.00$</p>
      </div>
    </article>
  );
};

export default OrderSummary;

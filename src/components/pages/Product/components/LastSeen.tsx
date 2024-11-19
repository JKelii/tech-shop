import React from "react";

import { getProductSlug } from "@/lib";
import { GetProductBySlugQuery } from "@/lib/hygraph/generated/graphql";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ProductType } from "../ProductPage";
import Image from "next/image";

export const LastSeen = ({ lastSeen }: { lastSeen: GetProductBySlugQuery }) => {
  console.log(lastSeen);
  return (
    <>
      <div className="">
        <p>Hej</p>
        <p>{lastSeen.product?.description}</p>
      </div>
    </>
  );
};

export default LastSeen;

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Testimonials = () => {
  return (
    <div className="flex h-96 w-[22rem] flex-col rounded-lg border  bg-white shadow-lg md:w-[35rem]">
      <Card className=" flex h-96 w-[22rem] flex-col items-start justify-start rounded-lg p-4 shadow-lg md:w-[35rem]">
        <CardHeader className="mt-4 text-xl font-semibold">
          <CardTitle>About Our Shop</CardTitle>
          <CardDescription className="text-center">
            Quality products for every need
          </CardDescription>
        </CardHeader>

        <CardContent className="text-md text-black/70">
          Welcome to Our Shop, where quality meets affordability. We&apos;ve
          been serving customers since 2010, offering a wide range of products
          from electronics to clothes. Our mission is to provide exceptional
          shopping experiences with top-notch customer service. We carefully
          curate our selection to ensure that every item meets our high
          standards of quality and value.
        </CardContent>
        <Separator className="mt-2" />
      </Card>
    </div>
  );
};

export default Testimonials;

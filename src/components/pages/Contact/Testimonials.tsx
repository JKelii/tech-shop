import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Testimonials = () => {
  return (
    <div className="bg-white border w-[22rem] md:w-[35rem] h-96 flex  shadow-lg rounded-lg flex-col">
      <Card className=" w-[22rem] md:w-[35rem] h-96 flex flex-col items-start justify-start shadow-lg rounded-lg p-4">
        <CardHeader className="text-xl font-semibold mt-4">
          <CardTitle>About Our Shop</CardTitle>
          <CardDescription className="text-center">
            Quality products for every need
          </CardDescription>
        </CardHeader>

        <CardContent className="text-black/70 text-md">
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Testimonials = () => {
  return (
    <div className="bg-gray-200 w-[22rem] md:w-[35rem] h-96 flex justify-center shadow-lg rounded-lg flex-col">
      <Card className="bg-neutral-100 w-[22rem] md:w-[35rem] h-96 flex justify-center shadow-lg rounded-lg p-4">
        <CardContent className="h-full flex-col gap-4">
          <h2 className="text-xl font-semibold mt-4"> About Our Shop</h2>
          <p className="text-muted-foreground text-md mt-4">
            Welcome to Our Shop, where quality meets affordability. We&apos;ve
            been serving customers since 2010, offering a wide range of products
            from electronics to clothes. Our mission is to provide exceptional
            shopping experiences with top-notch customer service. We carefully
            curate our selection to ensure that every item meets our high
            standards of quality and value.
          </p>
          <Separator className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Testimonials;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
//TODO:FIX
const Testimonials = () => {
  return (
    <div className="bg-neutral-100 w-[22rem] md:w-[35rem] h-96 flex justify-center shadow-lg rounded-lg flex-col">
      <Card>
        <CardContent className="h-full">
          <div className="mt-4 flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">
                Satisfied Customer
              </p>
            </div>
          </div>
          <blockquote className="text-muted-foreground">
            I&apos;m absolutely thrilled with the product I purchased. The
            quality is amazing and the customer service was top-notch.
          </blockquote>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="h-full">
          <div className="mt-4 flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Jane Smith</p>
              <p className="text-sm text-muted-foreground">Business Owner</p>
            </div>
          </div>
          <blockquote className="text-muted-foreground">
            I&apos;m absolutely thrilled with the product I purchased. The
            quality is amazing and the customer service was top-notch.
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
};

export default Testimonials;

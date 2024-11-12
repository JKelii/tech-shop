"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 justify-center flex-wrap items-center grow w-full mt-10 ">
      <h2 className="font-bold text-2xl">Page not found!</h2>
      <p className="text-lg">Could not find requested product!</p>
      <Button
        variant={"outline"}
        className="border-2 border-gray-500 p-1 rounded-md hover:border-gray-700"
      >
        <Link href={"/"}>Go back</Link>
      </Button>
    </div>
  );
};

export default NotFound;

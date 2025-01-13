"use client";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="mt-10 flex w-full grow flex-col flex-wrap items-center justify-center gap-4 ">
      <h2 className="text-2xl font-bold">Page not found!</h2>
      <p className="text-lg">Could not find requested product!</p>
      <Button
        variant={"outline"}
        className="rounded-md border-2 border-gray-500 p-1 hover:border-gray-700"
      >
        <Link href={"/"}>Go back</Link>
      </Button>
    </div>
  );
};

export default NotFound;

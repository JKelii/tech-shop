import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="container mx-auto my-10 flex min-h-screen min-w-[350px] flex-col items-center justify-start rounded-lg border-2 border-gray-200 bg-gray-100/50 shadow-md">
      <div className="flex w-full min-w-[350px] flex-col items-start justify-center gap-10 rounded-md p-8 md:flex-row">
        <Skeleton className="aspect-auto size-[411px] rounded-md border-2 border-gray-300" />
        <article className="mr-4 flex flex-col items-start justify-center gap-6">
          <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
            <Skeleton className="h-[30px] w-[250px]" />
            <Skeleton className="h-[30px] w-[150px]" />
          </div>
          <Skeleton className="h-[60px] w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-[40px] w-[100px]" />
            <Skeleton className="h-[40px] w-[100px]" />
          </div>
        </article>
      </div>
      <Skeleton className="h-[2px] w-full" />
      <div className="w-full p-8">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full" />
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
        </div>
      </div>
    </div>
  );
};

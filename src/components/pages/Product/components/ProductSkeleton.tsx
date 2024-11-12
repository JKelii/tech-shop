import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col container mx-auto justify-start shadow-md items-center min-h-screen bg-gray-100/50 border-2 border-gray-200 mt-10 rounded-lg mb-10 min-w-[350px]">
      <div className="flex flex-col md:flex-row justify-center items-start gap-10 w-full p-8 rounded-md min-w-[350px]">
        <Skeleton className="w-[411px] h-[411px] border-2 border-gray-300 rounded-md aspect-auto" />
        <article className="flex flex-col items-start justify-center gap-6 mr-4">
          <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center w-full">
            <Skeleton className="w-[250px] h-[30px]" />
            <Skeleton className="w-[150px] h-[30px]" />
          </div>
          <Skeleton className="w-full h-[60px]" />
          <div className="flex gap-2">
            <Skeleton className="w-[100px] h-[40px]" />
            <Skeleton className="w-[100px] h-[40px]" />
          </div>
        </article>
      </div>
      <Skeleton className="h-[2px] w-full" />
      <div className="w-full p-8">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <Skeleton className="w-full h-[80px]" />
          <Skeleton className="w-full h-[80px]" />
        </div>
      </div>
    </div>
  );
};

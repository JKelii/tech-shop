"use client";
import { addToLastSeenItems } from "@/actions/lastSeen";
import { useEffect } from "react";

//TODO: Change name, use useEffect
export const SaveProductInLastSeen = async ({ slug }: { slug: string }) => {
  useEffect(() => {
    addToLastSeenItems({ slug });
  }, [slug]);

  return <></>;
};

"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHits } from "react-instantsearch";

import { CustomPoweredBy } from "./CustomPoweredBy";
import { Hit } from "./Hit";

import { ScrollArea } from "@/components/ui/scroll-area";

import type { KeyboardEventHandler } from "react";

type ProductHit = {
  name: string;
  id: string;
  images: string;
  price: string;
  slug: string;
};

export const HitsScrollArea = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { hits } = useHits<ProductHit>();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const hitRefs = useRef<(HTMLDivElement | null)[]>([]);

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    if (key === "ArrowDown") {
      setFocusedIndex((prev) => (prev + 1) % hits.length);
    } else if (key === "ArrowUp") {
      setFocusedIndex((prev) => (prev - 1 + hits.length) % hits.length);
    } else if (key === "Enter" && focusedIndex >= 0) {
      const focusedHit = hits[focusedIndex];
      if (focusedHit) {
        window.location.href = `/item/${focusedHit.slug}`;
      }
    } else if (key === "Escape") {
      resetSearchComplete();
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && hitRefs.current[focusedIndex]) {
      hitRefs.current[focusedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedIndex]);

  return (
    <>
      <ScrollArea
        className="h-[250px] w-full min-w-[150px] scroll-smooth rounded-md border px-2 lg:w-full"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="flex flex-col items-start justify-start gap-4 p-2">
          {hits.map((hit, index) => (
            <div
              onClick={() => setIsOpen(false)}
              key={hit.id || index}
              ref={(el) => {
                hitRefs.current[index] = el;
              }}
              tabIndex={-1}
              className={`p-2  ${
                index === focusedIndex
                  ? "border border-gray-500 bg-gray-100"
                  : "bg-white"
              }`}
            >
              <Hit hit={hit} />
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex w-full items-center justify-between">
        <CustomPoweredBy />
        <p className="self-end text-sm text-muted-foreground">
          Number of products found: {hits.length}
        </p>
      </div>
    </>
  );
};

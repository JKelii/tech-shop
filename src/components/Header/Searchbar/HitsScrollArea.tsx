"use client";
import React, {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Hits, useHits } from "react-instantsearch";
import { Hit } from "./Hit";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        className="h-[250px] rounded-md border px-4 w-full lg:w-full"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div
          className="flex flex-col gap-4 justify-start items-start p-2"
          onClick={() => setIsOpen(false)}
        >
          {hits.map((hit, index) => (
            <div
              key={hit.id}
              ref={(el) => {
                hitRefs.current[index] = el;
              }}
              tabIndex={-1}
              className={`p-2  ${
                index === focusedIndex
                  ? "bg-gray-100 border border-gray-500 "
                  : "bg-white"
              }`}
            >
              <Hit hit={hit} />
            </div>
          ))}
        </div>
      </ScrollArea>
      <p className="text-sm text-muted-foreground self-end">
        Number of products found: {hits.length}
      </p>
    </>
  );
};

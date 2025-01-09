import React, { useRef, useState } from "react";
import { useInstantSearch, useSearchBox } from "react-instantsearch";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import type { UseSearchBoxProps } from "react-instantsearch";

export const CustomSearchBox = (props: UseSearchBoxProps) => {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === "stalled";

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <div>
      <form
        action=""
        role="search"
        className="flex"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setQuery("");

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <Input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search for products"
          spellCheck={false}
          maxLength={512}
          type="text"
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
          className="h-10 w-full rounded-md px-4"
        />
        <Skeleton
          hidden={!isSearchStalled}
          className="h-10 w-full rounded-md px-4"
        ></Skeleton>
      </form>
    </div>
  );
};

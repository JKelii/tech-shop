"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React, { useState } from "react";

const SelectQuantity = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const onValueChange = (value: string) => {
    setSelectedValue(value);
    console.log(value);
  };
  //TODO: Change select that it doesn't change the width of the page after opening
  return (
    <>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[120px] text-black border-2 border-gray-400 rounded-md">
          <SelectValue placeholder="1">{selectedValue}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-black/85 w-24 z-40 rounded-md ">
          <SelectGroup className="text-white">
            <SelectItem
              value="1"
              className="w-full flex justify-center items-center"
            >
              1
            </SelectItem>
            <SelectItem
              value="2"
              className="w-full flex justify-center items-center"
            >
              2
            </SelectItem>
            <SelectItem
              value="3"
              className="w-full flex justify-center items-center"
            >
              3
            </SelectItem>
            <SelectItem
              value="4"
              className="w-full flex justify-center items-center"
            >
              4
            </SelectItem>
            <SelectItem
              value="5"
              className="w-full flex justify-center items-center"
            >
              5
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectQuantity;

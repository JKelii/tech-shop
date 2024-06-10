"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React, { useState } from "react";

const selectValues = [
  { name: "1", value: "1" },
  { name: "2", value: "2" },
  { name: "3", value: "3" },
  { name: "4", value: "4" },
  { name: "5", value: "5" },
];

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
            {selectValues.map((item, index) => (
              <>
                <SelectItem
                  value={item.value}
                  className="w-full flex justify-center items-center"
                >
                  {item.name}
                </SelectItem>
              </>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectQuantity;

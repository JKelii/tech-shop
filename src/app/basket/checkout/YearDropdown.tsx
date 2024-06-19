"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

const YearDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("Year");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (year: string) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        ref={dropdownRef}
        className="relative flex flex-col items-center w-[7.5rem] h-[128px] rounded-lg m-2 mt-5"
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
          className="border-gray-500  p-1 w-full flex items-center justify-between text-sm rounded-lg tracking-wider border-2 duration-200 active:ring-2 ring-gray-400"
        >
          {selectedYear}
          {!isOpen ? <ChevronDown /> : <ChevronUp />}
        </button>
        {isOpen && (
          <div className="bg-gray-300 absolute top-12 flex flex-col items-start rounded-lg p-2 w-full">
            {years.map((item, index) => (
              <div
                className="flex w-full items-center justify-center hover:bg-gray-200 cursor-pointer rounded-lg border-l-transparent "
                key={index}
                onClick={() => handleClick(item)}
              >
                <h3 className="p-[1px]">{item}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YearDropdown;

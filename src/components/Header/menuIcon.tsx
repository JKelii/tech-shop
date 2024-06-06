import React, { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type MenuIconProps = {
  icon: ReactElement;
  path: string;
  className?: string;
};

const MenuIcon = ({ icon, path, className }: MenuIconProps) => {
  return (
    <a
      href={path}
      className={twMerge(
        `text-white hover:text-gray-200 transition h-full w-16 flex justify-center items-center`,
        className
      )}
    >
      {icon}
    </a>
  );
};

export default MenuIcon;

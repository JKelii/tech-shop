import React, { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type MenuIconProps = {
  icon: ReactElement;
  path: string;
  className?: string;
  name: string;
};

const MenuIcon = ({ icon, path, className, name }: MenuIconProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <a
        href={path}
        className={twMerge(
          `text-white hover:text-gray-200 transition h-full w-16 flex justify-center items-center`,
          className
        )}
      >
        {icon}
      </a>

      <p className="text-xs text-black/75 font-semibold">{name}</p>
    </div>
  );
};

export default MenuIcon;

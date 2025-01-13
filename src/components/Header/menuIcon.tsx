import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import type { ReactElement } from "react";

type MenuIconProps = {
  icon: ReactElement;
  path: string;
  className?: string;
  name: string;
};

const MenuIcon = ({ icon, path, className, name }: MenuIconProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Link
        href={path}
        className={twMerge(
          `text-white hover:text-gray-200 transition h-full w-16 flex justify-center items-center`,
          className,
        )}
      >
        {icon}
      </Link>

      <p className="text-xs font-semibold text-black/75">{name}</p>
    </div>
  );
};

export default MenuIcon;

import { BasketHeader } from "./BasketHeader";
import { NavItems } from "./Header";
import { Logo } from "./logo";
import { NavbarItem } from "./NavbarItem";
import { Searchbar } from "./Searchbar/Searchbar";

export const DesktopNavbar = () => {
  return (
    <div className="hidden border-separate border-b bg-background lg:block w-full shadow-md">
      <nav className="container flex flex-wrap items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-2 md:gap-x-4">
          <Logo />
        </div>
        <Searchbar />
        <div className="flex full ">
          {NavItems.map((item, index) => (
            <NavbarItem
              key={index}
              label={item.label}
              link={item.link}
              icon={item.icon}
            />
          ))}
          <BasketHeader styles="mt-2" />
        </div>
      </nav>
    </div>
  );
};

import { BasketHeader } from "./basketHeader";
import { NavItems } from "./Header";
import { Logo } from "./logo";
import { NavbarItem } from "./NavbarItem";
import { Searchbar } from "./Searchbar/Searchbar";

export const DesktopNavbar = () => {
  return (
    <div className="hidden w-full border-separate border-b bg-background shadow-md lg:block">
      <nav className="container flex flex-wrap items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-2 md:gap-x-4">
          <Logo />
        </div>
        <Searchbar />
        <div className="flex w-full ">
          {NavItems.map((item, index) => (
            <NavbarItem
              key={index}
              label={item.label}
              link={item.link}
              icon={item.icon}
            />
          ))}
          <BasketHeader styles="mt-1" aria-label="Basket" />
        </div>
      </nav>
    </div>
  );
};

import { HeartIcon, Mail, Package, User } from "lucide-react";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export const NavItems = [
  { label: "Favorites", link: "/favorites", icon: <HeartIcon /> },
  { label: "Contact", link: "/contact", icon: <Mail /> },
  { label: "Items", link: "/items", icon: <Package /> },
  { label: "Account", link: "/account", icon: <User /> },
];

const Header = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

export default Header;

"use client";

import {
  User,
  Phone,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Search,
} from "lucide-react";
import Logo from "./logo";
import MenuIcon from "./menu-icon";
import { useState } from "react";
import Searchbar from "./searchbar";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const toggleNavbar = () => setShowNavbar(!showNavbar);
  return (
    <header className="bg-mainBg w-full rounded-b-lg shadow-md">
      <nav className=" mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
          </div>
          <div className="relative hidden md:block">
            <Searchbar className="hidden min-w-12 md:block md:w-64 lg:w-96 " />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-slate-600/90 rounded-full w-8 h-8 flex justify-center items-center">
              <MagnifyingGlassIcon />
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <MenuIcon
                icon={
                  <Heart
                    width={30}
                    height={30}
                    className="text-white hover:text-gray-200 transition hover:-translate-y-1"
                  />
                }
                path="/favorites"
              />
              <MenuIcon
                icon={
                  <Phone
                    width={30}
                    height={30}
                    className="text-white hover:text-gray-200 transition hover:-translate-y-1"
                  />
                }
                path="/contact"
              />
              <MenuIcon
                icon={
                  <User
                    width={30}
                    height={30}
                    className="text-white hover:text-gray-200 transition hover:-translate-y-1 "
                  />
                }
                path="/login"
              />
              <div className="flex hover:-translate-y-1 transition justify-center items-center">
                <MenuIcon
                  className="p-0 m-0 w-12"
                  icon={
                    <ShoppingCart
                      width={30}
                      height={30}
                      className="text-white hover:text-gray-200 transition "
                    />
                  }
                  path="/basket"
                />
                <p className="text-white font-bold text-2xl self-center m-0">
                  1
                </p>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white  hover:text focus:ring-2 ring-white "
              onClick={toggleNavbar}
            >
              {showNavbar ? (
                <X className="hover:-translate-y-[1px]  transition duration-300" />
              ) : (
                <Menu className="hover:-translate-y-[1px] transition duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {showNavbar && (
        <div className="md:hidden">
          <div className="flex justify-center items-center relative ml-6">
            <Searchbar className="md:hidden" />
            <button
              className="relative right-4 -translate-x-7
             bg-slate-100 hover:bg-slate-600/90 rounded-full w-8 h-8 flex justify-center items-center"
            >
              <MagnifyingGlassIcon className="w-12" />
            </button>
          </div>
          <div className="flex  justify-center items-center gap-6 py- py-4 px-2">
            <MenuIcon
              icon={
                <Heart className="text-white hover:text-gray-200 transition hover:-translate-y-1" />
              }
              path="/favorites"
            />
            <MenuIcon
              icon={
                <Phone className="text-white hover:text-gray-200 transition hover:-translate-y-1" />
              }
              path="/contact"
            />
            <MenuIcon
              icon={
                <User className="text-white hover:text-gray-200 transition hover:-translate-y-1 " />
              }
              path="/account"
            />
            <div className="flex hover:-translate-y-1 transition justify-start items-center">
              <MenuIcon
                className="p-0 m-0 w-12"
                icon={
                  <ShoppingCart className="text-white hover:text-gray-200 transition" />
                }
                path="/basket"
              />
              <p className="text-white font-bold text-2xl self-center m-0">1</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import Newsletter from "@/components/Newsletter";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex lg:flex-row flex-col justify-center items-center gap-4 mt-10 md:mt-5 mb-5 lg:mb-0">
      <div className="bg-neutral-100 w-[22rem] md:w-[35rem] h-96 flex justify-center shadow-lg rounded-lg">
        <article className="w-80 flex flex-col justify-start items-start gap-4 mt-8">
          <h2 className="text-xl font-bold">Contact Us</h2>
          <div className="flex justify-center items-center">
            <p className="text-gray-600">
              Address 123 Main Street, Anytown USA
            </p>
            <p className="text-gray-600">Phone (123) 456-7890</p>
          </div>
          <div className="">
            <p className=" ">Email</p>
            <p className=" text-gray-600">info@example.com</p>
          </div>
          <p>Social Media</p>
          <div className="flex gap-4">
            <Link href="https://www.instagram.com">
              <Instagram className="text-gray-600" />
            </Link>
            <Link href="https://www.facebook.com">
              <Facebook className="text-gray-600" />
            </Link>
            <Link href="https://www.twitter.com">
              <Twitter className="text-gray-600" />
            </Link>
          </div>
        </article>
      </div>
      <Newsletter />
    </div>
  );
};

export default page;

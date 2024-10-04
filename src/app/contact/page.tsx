import Newsletter from "@/components/Newsletter";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { AskedQuestions } from "./_components/AskedQuestions";
import Testimonials from "./_components/Testimonials";
import { cookies } from "next/headers";

const page = () => {
  const isSignedInNewsletter = Boolean(cookies().get("newsletter")?.value);
  const emailCookie = cookies().get("email")?.value;

  return (
    <div className="min-h-screen flex flex-col justify-start items-center gap-8 border-2 bg-gray-200/50 rounded-lg border-gray-500 p-10 mt-10 mb-10">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-neutral-100 w-[22rem] md:w-[35rem] h-96 flex justify-center shadow-lg rounded-lg p-4">
          <article className="w-96 flex flex-col justify-start items-start gap-4 mt-8 ">
            <h2 className="text-xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have a question or need assistance? Contact us using the
              information below.
            </p>
            <div className="flex justify-start flex-col items-start gap-4">
              <p className="text-gray-600 flex gap-2">
                <MapPin /> Address: 123 Main Street, Anytown USA
              </p>
              <p className="text-gray-600 flex gap-2">
                <Phone /> Phone (123) 456-7890
              </p>
              <div className="flex gap-2 text-gray-600">
                <p className=" flex gap-2">
                  <Mail /> Email:
                </p>
                <p className="text-gray-600">info@example.com</p>
              </div>
            </div>

            <p className="font-semibold">Social Media</p>
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
        <Newsletter
          isSignedInNewsletter={isSignedInNewsletter}
          emailCookie={emailCookie}
        />
      </div>
      <div className="flex flex-col  justify-center items-center lg:flex-row  gap-4">
        <AskedQuestions />
        {/*Change Testimonials */}
        <Testimonials />
      </div>
    </div>
  );
};

export default page;

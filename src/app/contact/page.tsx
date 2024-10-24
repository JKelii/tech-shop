import Newsletter from "@/components/pages/Contact/Newsletter";
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
import { AskedQuestions } from "../../components/pages/Contact/AskedQuestions";
import Testimonials from "../../components/pages/Contact/Testimonials";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/card";

const page = () => {
  const isSignedInNewsletter = Boolean(cookies().get("newsletter")?.value);
  const emailCookie = cookies().get("email")?.value;
  //TODO: make the whole comoponent better
  return (
    <Card className="min-h-screen container mx-auto flex flex-col justify-start items-center gap-8 border-2 bg-gray-200/50 rounded-lg border-gray-500 p-10 mt-10 mb-10">
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="bg-neutral-100 w-[22rem] md:w-[35rem] h-96 flex flex-col justify-start items-center rounded-lg shadow-lg ">
          <article className="ml-2 lg:ml-4 flex flex-col justify-start items-start gap-4 mt-8">
            <h2 className="text-xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have a question or need assistance? Contact us using the
              information below.
            </p>

            <address className="not-italic">
              <dl className="flex flex-col gap-6">
                <div className="flex items-center">
                  <dt className="sr-only">Address</dt>
                  <dd className="text-gray-600 flex gap-2">
                    <p className="flex gap-2">
                      <MapPin /> 123 Main Street, Anytown USA
                    </p>
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="sr-only">Phone</dt>
                  <dd className="text-gray-600 flex gap-2">
                    <p className="flex gap-2">
                      <Phone /> (123) 456-7890
                    </p>
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="sr-only">Email</dt>
                  <dd className="text-gray-600 ">
                    <a
                      href="mailto:info@example.com"
                      className="hover:underline flex gap-2"
                    >
                      <Mail /> info@example.com
                    </a>
                  </dd>
                </div>
              </dl>
            </address>

            <div>
              <dt className="font-semibold">Social Media</dt>
              <dd>
                <div className="flex gap-4 mt-4">
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
              </dd>
            </div>
          </article>
        </div>
        <Newsletter
          isSignedInNewsletter={isSignedInNewsletter}
          emailCookie={emailCookie}
        />
      </div>
      <div className="flex flex-col  justify-center items-center xl:flex-row  gap-4">
        <AskedQuestions />
        {/*Change Testimonials */}
        <Testimonials />
      </div>
    </Card>
  );
};

export default page;

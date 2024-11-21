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
import { PlatformLinks } from "@/components/pages/Contact/PlatformLinks";

const page = () => {
  const isSignedInNewsletter = Boolean(cookies().get("newsletter")?.value);
  const emailCookie = cookies().get("email")?.value;

  return (
    <Card className="min-h-screen container mx-auto flex flex-col justify-start items-center gap-8 border-[2px] bg-gray-50 rounded-lg  p-10 mt-10 mb-10">
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="bg-white border w-[22rem] md:w-[35rem] h-96 flex flex-col justify-start items-center rounded-lg shadow-lg ">
          <article className="ml-2 lg:ml-4 flex flex-col justify-start items-start gap-4 mt-8">
            <h2 className="text-xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have a question or need assistance? Contact us using the
              information below.
            </p>
            <section>
              <address className="flex flex-col gap-4 not-italic">
                <h4 className="text-lg font-bold">Contact Information</h4>
                <ul className="text-gray-600 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">
                      <MapPin />
                    </span>
                    123 Main Street, Anytown USA
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true">
                      <Phone />
                    </span>
                    (123) 456-7890
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Link
                      href="mailto:info@example.com"
                      className="hover:underline flex items-center gap-2"
                    >
                      <span aria-hidden="true">
                        <Mail />
                      </span>
                      info@example.com
                    </Link>
                  </li>
                </ul>
              </address>
            </section>
            <div>
              <h4 className="text-lg font-semibold">Social Media</h4>
              <nav aria-label="Pagination Navigation">
                <PlatformLinks />
              </nav>
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
        <Testimonials />
      </div>
    </Card>
  );
};

export default page;

import { Mail, MapPin, Phone } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

import { AskedQuestions } from "../../components/pages/Contact/AskedQuestions";
import Testimonials from "../../components/pages/Contact/Testimonials";

import Newsletter from "@/components/pages/Contact/Newsletter";
import { PlatformLinks } from "@/components/pages/Contact/PlatformLinks";
import { Card } from "@/components/ui/card";

const page = async () => {
  const isSignedInNewsletter = Boolean(
    (await cookies()).get("newsletter")?.value,
  );
  const emailCookie = (await cookies()).get("email")?.value;

  return (
    <Card className="container mx-auto my-10 flex min-h-screen flex-col items-center justify-start gap-8 rounded-lg border-2  bg-gray-50 p-10">
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex h-96 w-[22rem] flex-col items-center justify-start rounded-lg border bg-white p-1 shadow-lg md:w-[35rem]">
          <article className="ml-2 mt-8 flex flex-col items-start justify-start gap-4 lg:ml-4">
            <h2 className="text-xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have a question or need assistance? Contact us using the
              information below.
            </p>
            <section>
              <address className="flex flex-col gap-4 not-italic">
                <h4 className="text-lg font-bold">Contact Information</h4>
                <ul className="flex flex-col gap-2 text-gray-600">
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
                      className="flex items-center gap-2 hover:underline"
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
      <div className="flex flex-col  items-center justify-center gap-4  xl:flex-row">
        <AskedQuestions />
        <Testimonials />
      </div>
    </Card>
  );
};

export default page;

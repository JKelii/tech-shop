"use client";
import { addToLastSeenItems } from "@/actions/lastSeen";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const SaveProductInLastSeen = async ({ slug }: { slug: string }) => {
  const consentCookie = Cookies.get("cookieConstant");

  useEffect(() => {
    if (consentCookie) {
      addToLastSeenItems({ slug });
    }
  }, [slug, consentCookie]);

  return <></>;
};

"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";

import { addToLastSeenItems } from "@/actions/lastSeen";

export const SaveProductInLastSeen = ({ slug }: { slug: string }) => {
  const consentCookie = Cookies.get("cookieConstant");

  useEffect(() => {
    if (consentCookie) {
      addToLastSeenItems({ slug });
    }
  }, [slug, consentCookie]);

  return <></>;
};

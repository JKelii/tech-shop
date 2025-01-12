"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";

import { addToLastSeenItems } from "@/actions/lastSeen";

export const SaveProductInLastSeen = ({ slug }: { slug: string }) => {
  const consentCookie = Cookies.get("cookieConstant");

  useEffect(() => {
    if (consentCookie) {
      const saveItem = async () => {
        try {
          await addToLastSeenItems({ slug });
        } catch (error) {
          throw error;
        }
        await saveItem();
      };
      saveItem();
    }
  }, [slug, consentCookie]);

  return <></>;
};

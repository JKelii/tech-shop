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
          console.error("Error saving item", error);
        }
        await saveItem();
      };
    }
  }, [slug, consentCookie]);

  return <></>;
};

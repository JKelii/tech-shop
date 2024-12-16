"use client";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export const CookiesModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const cookie = Cookies.get("cookieConstant");
    if (!cookie) setShowModal(true);
  }, []);

  const handleReject = () => {
    setShowModal(false);
  };

  const handleAccept = () => {
    try {
      Cookies.set("cookieConstant", "cookieConstant", { expires: 365 });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-x-0 bottom-0 flex h-24 items-center justify-center border-t bg-background p-4 shadow-lg">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm text-foreground sm:text-left">
              We use cookies to enhance your browsing experience and analyze our
              traffic. By clicking &quot;Accept&quot;, you consent to our use of
              cookies.
            </p>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={"ghost"}
                className="bg-black text-white"
                onClick={handleAccept}
              >
                Accept
              </Button>
              <Button variant="outline" size="sm" onClick={handleReject}>
                Reject
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const CookiesModal = () => {
  const [showModal, setShowModal] = useState<Boolean>(false);

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
        <div className="fixed bottom-0 left-0 right-0 h-24 flex justify-center items-center bg-background border-t p-4 shadow-lg">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground text-center sm:text-left">
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
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

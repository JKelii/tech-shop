"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const ClientContexts = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NuqsAdapter>
        <SessionProvider>{children}</SessionProvider>{" "}
      </NuqsAdapter>
    </>
  );
};

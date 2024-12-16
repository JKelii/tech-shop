"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

import type { ReactNode } from "react";

export const ClientContexts = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

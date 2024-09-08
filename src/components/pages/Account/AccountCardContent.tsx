"use client";

import { Button } from "@/components/ui/button";

import { signOut, useSession } from "next-auth/react";

const AccountCardContent = () => {
  const session = useSession();
  return (
    <div className="">
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
    </div>
  );
};

export default AccountCardContent;

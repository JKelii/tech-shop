"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";

import { signOut, useSession } from "next-auth/react";

const AccountCardContent = () => {
  const session = useSession();
  return (
    <div className="w-full min-w-[360px]">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Account</CardTitle>
            <CardDescription>{session.data?.user?.email}</CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
};

export default AccountCardContent;

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import AccountCardContent from "@/components/pages/Account/AccountCardContent";
import { FilterOrders } from "@/components/pages/Account/FilterOrders";

import { getOrders } from "@/lib";

const page = async () => {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const orders = await getOrders();

  if (orders && "error" in orders) {
    return <p>{orders.error}</p>;
  }

  return (
    <div className="container mx-auto mb-8 mt-4 flex min-h-screen flex-col  items-center justify-start gap-12 rounded-lg border-2 border-gray-200 bg-gray-100/50 py-10 shadow-md">
      <AccountCardContent />

      {orders && <FilterOrders orders={orders} />}
    </div>
  );
};

export default page;

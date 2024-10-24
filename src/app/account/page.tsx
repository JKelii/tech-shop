import AccountCardContent from "@/components/pages/Account/AccountCardContent";
import FilterOrders from "@/components/pages/Account/FilterOrders";
import { OrdersList } from "@/components/pages/Account/OrdersList";
import { getOrders } from "@/lib";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
    <div className="min-h-screen container mx-auto flex justify-start items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <AccountCardContent />
      {orders && <FilterOrders orders={orders} />}
    </div>
  );
};

export default page;

import AccountCardContent from "@/components/pages/Account/AccountCardContent";
import { OrdersList } from "@/components/pages/Account/OrdersList";
import { getOrders } from "@/lib";

const page = async () => {
  const orders = await getOrders();
  if ("error" in orders) {
    return <p>{orders.error}</p>;
  }

  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <AccountCardContent />
      <OrdersList orders={orders} />
    </div>
  );
};

export default page;

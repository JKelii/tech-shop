import { getOrders } from "@/lib";
import React from "react";

const Orders = async () => {
  const orders = await getOrders();
  if ("error" in orders) {
    return <p>{orders.error}</p>;
  }

  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <div>
        {orders.map((order) => {
          return (
            <div className="" key={order.stripeCheckoutId}>
              <p>{order.stripeCheckoutId}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;

import AccountCardContent from "./_components/AccountCardContent";

import { getOrders } from "@/lib";

const page = async () => {
  const orders = await getOrders();
  if ("error" in orders) {
    return <p>{orders.error}</p>;
  }

  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <AccountCardContent />
    </div>
  );
};

export default page;

{
  /* <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2" />
            Your Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.}>
                  <TableCell>
                    <Image
                      width={100}
                      height={100}
                      src={order.image}
                      alt={order.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    ${(order.price * order.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */
}

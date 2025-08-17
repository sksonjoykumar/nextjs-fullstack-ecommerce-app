import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/orders/OrdersColumns";

const Orders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  const orders = await res.json();
  return (
    <div className="mt-3">
      <h3 className="border-b text-3xl font-semibold text-gray-700">Orders</h3>
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export default Orders;

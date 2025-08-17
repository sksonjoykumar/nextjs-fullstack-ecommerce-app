import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${params.orderId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return <div className="p-10">Order not found or failed to load.</div>;
  }

  const { order, customer } = await res.json();
  const { street, city, state, postalCode, country } = order.shippingAddress;

  //  check if order exists
  if (!order) {
    return <div className="p-10">Order not found or failed to load.</div>;
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <h2 className="text-3xl font-semibold text-gray-700">Order Items</h2>
      <DataTable columns={columns} data={order.products} searchKey="product" />
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-700">Order Summary</h2>
        <p className="mt-1 text-base font-semibold text-gray-700">
          Order Id:{" "}
          <span className="text-sm font-normal text-gray-600">{order._id}</span>
        </p>
        <p className="mt-1 text-base font-semibold text-gray-700">
          Customer name:{" "}
          <span className="text-sm font-normal text-gray-600">
            {customer?.name || "N/A"}
          </span>
        </p>
        <p className="mt-1 text-base font-semibold text-gray-700">
          Shipping Address:{" "}
          <span className="text-sm font-normal text-gray-600">
            {street}, {city}, {state}, {postalCode}, {country}
          </span>
        </p>
        <p className="mt-1 text-base font-semibold text-gray-700">
          Total Paid:{" "}
          <span className="text-sm font-normal text-gray-600">
            ${order.totalAmount}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;

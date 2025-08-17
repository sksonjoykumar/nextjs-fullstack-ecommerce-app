import { connectToDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import Order from "@/models/Order";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const orders = await Order.find().sort({ createdAt: -1 });
    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findOne({ clerkId: order.customerId });
        return {
          _id: order._id,
          customer: customer ? customer.name : "Unknown Customer",
          products: order.products.length,
          totalAmount: order.totalAmount,
          createdAt: format(order.createdAt, "MMM do, yyyy"),
        };
      }),
    );

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    console.log("[ORDERS_GET]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};

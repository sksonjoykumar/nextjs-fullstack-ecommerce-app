import { connectToDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: string } },
) => {
  try {
    await connectToDB();

    const order = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: "Product",
    });

    if (!order) {
      return NextResponse.json("Order not found", { status: 404 });
    }

    const customer = await Customer.findOne({
      clerkId: order.customerClerkId,
    });

    return NextResponse.json({ order, customer }, { status: 200 });
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return NextResponse.json("Order Internal Server Error", { status: 500 });
  }
};

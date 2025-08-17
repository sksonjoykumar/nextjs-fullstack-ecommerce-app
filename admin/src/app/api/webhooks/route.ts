/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";
import Customer from "@/models/Customer";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

// webhooks route handler
export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Web hook", session);

      // get customer info
      const customerInfo = {
        clerkId: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      };

      // get shipping address
      const shippingAddress = {
        street: session.customer_details?.address?.line1 || "",
        city: session.customer_details?.address?.city || "",
        state: session.customer_details?.address?.state || "",
        postalCode: session.customer_details?.address?.postal_code || "",
        country: session.customer_details?.address?.country || "",
      };

      // get order items
      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session?.id,
        { expand: ["line_items.data.price.product"] },
      );
      const lineItems = await retrieveSession?.line_items?.data;

      const orderItems = lineItems?.map((item: any) => {
        return {
          product: item.price.product.metadata.productId,
          color: item.price.product.metadata.color || "N/A",
          size: item.price.product.metadata.size || "N/A",
          quantity: item.quantity,
        };
      });

      // connectToDB
      connectToDB();

      // create new order
      const newOrder = new Order({
        customerClerkId: customerInfo.clerkId,
        products: orderItems,
        shippingAddress: shippingAddress,
        shippingRate: session?.shipping_cost?.shipping_rate,
        totalAmount: session?.amount_total ? session?.amount_total / 100 : 0,
      });

      await newOrder.save();

      //   update customer
      let customer = await Customer.findOne({
        clerkId: customerInfo.clerkId,
      });

      if (customer) {
        customer.orders.push(newOrder._id);
      } else {
        customer = new Customer({
          ...customerInfo,
          orders: [newOrder._id],
        });
      }
      // save customer
      await customer.save();
    }

    return NextResponse.json("Order created", {
      status: 200,
    });
  } catch (error) {
    console.log("Webhooks-POST", error);
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 },
    );
  }
};

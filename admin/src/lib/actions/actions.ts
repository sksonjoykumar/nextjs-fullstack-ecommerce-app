import Customer from "@/models/Customer";
import Order from "@/models/Order";
import { connectToDB } from "../mongodb";

// getTotalCustomers
export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0,
  );
  return { totalOrders, totalRevenue };
};

// getTotalCustomers
export const getTotalCustomers = async () => {
  await connectToDB();
  const customers = await Customer.find();
  const totalCustomers = customers.length;
  return { totalCustomers };
};

// getSalesPerMonth
export const getSalesPerMonth = async () => {
  await connectToDB();
  const orders = await Order.find();

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth();
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    return acc;
  }, {});

  const graphData = Array.from({ length: 12 }).map((_, index) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, index),
    );
    return { name: month, sales: salesPerMonth[index] || 0 };
  });
  return { graphData };
};

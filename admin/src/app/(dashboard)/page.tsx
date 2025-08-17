import SalesChart from "@/components/custom-ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag } from "lucide-react";

// Metadata
export const metadata = {
  title: "Dashboard",
  description: "Admin panel for shopping app",
};

const Dashboard = async () => {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers().then(
    (data) => data.totalCustomers,
  );

  const graphData = await getSalesPerMonth();

  return (
    <div className="mt-3">
      <h2 className="border-b pb-2 text-3xl font-semibold text-gray-700">
        Dashboard
      </h2>

      <div className="mt-7 grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-10">
        <Card className="cursor-pointer transition-all duration-300 hover:bg-gray-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Total Revenue
            </CardTitle>
            <CircleDollarSign className="text-gray-700 max-sm:hidden" />
          </CardHeader>
          <CardContent className="text-center text-2xl font-semibold text-gray-700">
            <p>$ {totalRevenue}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-all duration-300 hover:bg-gray-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Total Orders
            </CardTitle>
            <ShoppingBag className="text-gray-700 max-sm:hidden" />
          </CardHeader>
          <CardContent className="text-center text-2xl font-semibold text-gray-700">
            <p>{totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-all duration-300 hover:bg-gray-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Total Customers
            </CardTitle>
            <CircleDollarSign className="text-gray-700 max-sm:hidden" />
          </CardHeader>
          <CardContent className="text-center text-2xl font-semibold text-gray-700">
            <p>{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Sales Chart ($)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <SalesChart data={graphData.graphData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { connectToDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

const Customers = async () => {
  await connectToDB();

  const customersFromDb = await Customer.find()
    .sort({ createdAt: "desc" })
    .lean();

  // Map MongoDB documents to CustomerType
  const customers = customersFromDb.map((customer: any) => ({
    id: customer._id.toString(),
    clerkId: customer.clerkId,
    name: customer.name,
    email: customer.email,
    createdAt: customer.createdAt,
    // add other fields as needed
  }));

  return (
    <>
      <div className="mt-3">
        <h2 className="border-b pb-2 text-3xl font-semibold text-gray-700">
          Customers
        </h2>
        <div className="mt-4">
          <DataTable columns={columns} data={customers} searchKey="name" />
        </div>
      </div>
    </>
  );
};

export default Customers;

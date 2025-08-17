"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original.product;

      if (!product || typeof product !== "object") {
        return <span className="text-gray-500 italic">Product not found</span>;
      }

      return (
        <Link
          href={`/products/${product._id}`}
          className="transition-all duration-300 ease-in-out hover:text-[#0F925C]"
        >
          {product.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];

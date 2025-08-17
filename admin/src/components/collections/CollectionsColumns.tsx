"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Delete from "../custom-ui/Delete";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="transition-all duration-300 ease-in-out hover:text-[#0F925C]"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      console.log(row.original.products.length);
      return <p>{row.original.products.length}</p>;
    },
  },
  {
    id: "actions",
    header: "Delete",
    cell: ({ row }) => <Delete item="Collection" id={row.original._id} />,
  },
];

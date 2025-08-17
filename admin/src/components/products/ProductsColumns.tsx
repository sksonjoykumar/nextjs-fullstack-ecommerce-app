'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import Delete from '../custom-ui/Delete';

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="hover:text-[#0F925C] transition-all duration-300 ease-in-out"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'collections',
    header: 'Collections',
    cell: ({ row }) =>
      row.original.collections.map(collection => collection.title).join(', '),
  },
  {
    accessorKey: 'price',
    header: 'Price ($)',
  },
  {
    accessorKey: 'expense',
    header: 'Expense ($)',
  },
  {
    id: 'actions',
    header: 'Delete',
    cell: ({ row }) => <Delete item="Product" id={row.original._id} />,
  },
];

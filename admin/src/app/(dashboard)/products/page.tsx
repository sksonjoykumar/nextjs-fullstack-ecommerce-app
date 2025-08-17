'use client';

import Loading from '@/app/loading';
import { DataTable } from '@/components/custom-ui/DataTable';
import { columns } from '@/components/products/ProductsColumns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Products Component
export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // getProducts
  const getProducts = async () => {
    try {
      const res = await fetch('/api/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log('Products-Get', error);
    }
  };

  // useEffect
  useEffect(() => {
    getProducts();
  }, []);

  //loading
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-2 flex justify-between flex-wrap items-center gap-4 border-b-2 pb-8">
        <h1 className="text-3xl font-semibold text-[#0078FF] ">Products</h1>

        <Button className="bg-[#0F925C] hover:bg-[#0f925cea] transition-all duration-200 text-base py-3">
          <Link href={'/products/new'} className="flex items-center gap-1">
            <Plus className="h-10 w-10" />
            Create Product
          </Link>
        </Button>
      </div>
      {/* DataTable */}
      <div className="">
        <DataTable columns={columns} data={products} searchKey="title" />
      </div>
    </>
  );
}

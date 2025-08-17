'use client';
import Loading from '@/app/loading';
import { columns } from '@/components/collections/CollectionsColumns';
import { DataTable } from '@/components/custom-ui/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';



export default function Collections() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<ProductType[]>([]);

  // getCollections
  const getCollections = async () => {
    try {
      const res = await fetch('/api/collections', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log('Collections-Get', error);
    }
  };

  // useEffect
  useEffect(() => {
    getCollections();
  }, []);

  // loading
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-2 flex justify-between flex-wrap items-center gap-4 border-b-2 pb-8">
        <h1 className="text-3xl font-semibold text-[#0078FF] ">Collections</h1>

        <Button className="bg-[#0F925C] hover:bg-[#0f925cea] transition-all duration-200 text-base py-3">
          <Link href={'/collections/new'} className="flex items-center gap-1">
            <Plus className="h-10 w-10" />
            Create Collection
          </Link>
        </Button>
      </div>
      {/* DataTable */}
      <div className="">
        <DataTable columns={columns} data={collections} searchKey="title" />
      </div>
    </>
  );
}

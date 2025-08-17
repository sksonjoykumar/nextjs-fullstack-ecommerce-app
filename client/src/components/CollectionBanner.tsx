/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";

const CollectionBanner = ({
  collectionDetails,
}: {
  collectionDetails: any;
}) => {
  return (
    <>
      <div className="relative mt-6">
        <h1 className="text-3xl font-semibold text-[#0F925C] lg:ml-16">
          {collectionDetails.title}
        </h1>
        <Image
          src={collectionDetails.image}
          alt="Product Image"
          width={500}
          height={400}
          className="mt-4 h-[78vh] w-full cursor-pointer rounded-lg border object-cover shadow-sm transition-all duration-400"
        />
      </div>
      <Link
        className="running-smooth absolute top-10/12 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#0F925C] px-4 py-2 text-white transition-all duration-200 hover:bg-[#0f925cd9]"
        href={`/`}
      >
        Shop Now
      </Link>
    </>
  );
};

export default CollectionBanner;

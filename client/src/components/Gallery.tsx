"use client";
import Image from "next/image";
import { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <Image
          src={mainImage}
          alt="Product Image"
          width={500}
          height={400}
          className="cursor-pointer rounded-lg border border-[#0F925C] object-contain shadow-sm transition-all duration-400 hover:scale-105 hover:shadow-lg"
        />
        <div className="scrollbar-hide flex gap-4 overflow-auto rounded-sm border">
          {productMedia?.map((image, index) => (
            <Image
              onClick={() => setMainImage(image)}
              key={index}
              src={image}
              alt="Product Thumbnail"
              width={100}
              height={100}
              className="h-[100px] w-[100px] cursor-pointer rounded-lg border border-gray-400 object-cover shadow-sm"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;

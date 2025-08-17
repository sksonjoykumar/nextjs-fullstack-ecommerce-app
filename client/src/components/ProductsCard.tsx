"use client";
import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

// Product Card Component

const ProductsCard = ({ product }: { product: ProductType }) => {
  return (
    <>
      <div className=" ">
        <div className="rounded-md border p-4 transition-shadow duration-300 hover:border-[#0F925C] hover:shadow-lg">
          <Link href={`/products/${product._id}`}>
            <Image
              src={product.media[0]}
              alt={product.title}
              className="h-48 w-full rounded-md border object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              loading="lazy"
              decoding="async"
              width={350}
              height={250}
            />
            <h2 className="mt-2 text-lg font-semibold text-gray-700">
              {product.title}
            </h2>
            <p className="text-sm text-gray-600">{product.category}</p>
          </Link>
          {/* price and wishlist  */}
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold text-[#0F925C]">${product.price}</p>

            {/* HeartFavorite Component */}
            <HeartFavorite product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCard;

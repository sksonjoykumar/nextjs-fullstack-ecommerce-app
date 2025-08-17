"use client";
import { useCart } from "@/lib/hooks/useCart";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { Button } from "./ui/button";

const ProductInfo = ({ productInfo }: { productInfo: any }) => {
  const [selectColor, setSelectColor] = useState<string>(productInfo.colors[0]);
  const [selectSize, setSelectSize] = useState<string>(productInfo.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const cart = useCart();

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between gap-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            {productInfo.title}
          </h2>
          <HeartFavorite product={productInfo} />
        </div>

        <div className="mt-2">
          <h4 className="text-base font-semibold text-gray-500">
            Category:{" "}
            <span className="text-lg text-gray-800">
              {productInfo.category}
            </span>
          </h4>
          <h3 className="my-1 text-xl font-semibold text-gray-800">
            ${productInfo.price.toFixed(2)}
          </h3>
          <div className="">
            <p className="text-gray-500">Description:</p>
            <p className="text-sm text-gray-800">
              {productInfo.description.slice(0, 350)}...
            </p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">Colors:</p>
            <p className="mt-2 text-sm text-gray-800">
              {productInfo.colors.map((color: string) => (
                <button
                  type="button"
                  onClick={() => setSelectColor(color)}
                  key={color}
                  className={`mr-2 cursor-pointer rounded-md border border-gray-400 px-5 py-1.5 shadow-sm ${
                    selectColor === color ? "bg-[#0F925C] text-white" : ""
                  }`}
                >
                  {color}
                </button>
              ))}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">Sizes:</p>
            <p className="mt-2 text-sm text-gray-800">
              {productInfo.sizes.map((size: string) => (
                <span
                  onClick={() => setSelectSize(size)}
                  key={size}
                  className={`${
                    selectSize === size ? "bg-[#0F925C] text-white" : ""
                  } mr-2 cursor-pointer rounded-md border border-gray-400 px-5 py-1.5 shadow-sm`}
                >
                  {size}
                </span>
              ))}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500">Quantity:</p>
            <div className="mt-1 flex items-center gap-4">
              <button
                onClick={() => setQuantity(quantity <= 0 ? 0 : quantity - 1)}
                type="button"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-700 p-1 text-xl text-[#0F925C] shadow-md"
              >
                <Minus />
              </button>
              <p className="min-w-5 text-center text-xl text-[#0F925C]">
                {quantity}
              </p>
              <button
                onClick={() => setQuantity(quantity + 1)}
                type="button"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-700 p-1 text-xl text-[#0F925C] shadow-md"
              >
                <Plus />
              </button>
            </div>
          </div>

          {/* button */}
          <div className="mt-6 mb-3">
            <Button
              onClick={() => {
                if (quantity > 0) {
                  cart.addItem({
                    item: productInfo,
                    quantity,
                    size: selectSize,
                    color: selectColor,
                    _id: undefined,
                  });
                } else {
                  cart.removeItem(productInfo._id);
                }
              }}
              className="inline-block h-10 w-full cursor-pointer rounded-3xl bg-gray-200 text-gray-800 transition-colors duration-300 hover:bg-[#0F925C] hover:text-white md:w-1/2"
            >
              {quantity > 0 ? "Add to Cart" : " Remove from cart"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;

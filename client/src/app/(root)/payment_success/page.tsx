/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCart } from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <h3 className="text-3xl font-semibold text-red-400">
        Successful Payment
      </h3>
      <p className="mt-2 text-base text-gray-700">
        Thank you for your purchase
      </p>

      <Link
        href={"/"}
        className="mt-4 cursor-pointer rounded-md bg-[#0F925C] px-4 py-2 text-white transition-all duration-200 hover:bg-[#0f925cde]"
      >
        Continue To Shopping
      </Link>
    </div>
  );
};

export default PaymentSuccess;
export const dynamic = "force-dynamic";
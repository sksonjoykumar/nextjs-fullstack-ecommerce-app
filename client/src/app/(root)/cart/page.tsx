/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useCart } from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// cart page
const cart = () => {
  const router = useRouter();
  const user = useUser();
  const cart = useCart();

  // handle checkout
  const handleCheckout = async () => {
    try {
      if (!user.isSignedIn) {
        return router.push("/sign-in");
      }

      const customer = {
        clerkId: user.user!.id,
        email: user.user!.emailAddresses[0].emailAddress,
        name: user.user!.fullName,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cart.cartItems,
          customer,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe session creation failed:", data);
      }
    } catch (error) {
      console.error("Error in checkout:", error);
    }
  };

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-10 px-4 md:px-16 lg:flex-nowrap">
        <div className="w-2/3">
          <h3 className="my-5 border-b pb-1 text-2xl font-semibold text-gray-700">
            Shopping Cart
          </h3>

          {cart.cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <div>
              {cart.cartItems.map((item) => (
                <div
                  className="flex items-center justify-between gap-3 rounded-lg transition-all duration-300 hover:bg-gray-100 sm:gap-6 sm:p-4"
                  key={item._id}
                >
                  <Image
                    src={item.item.media[0]}
                    alt={item.item.title}
                    width={100}
                    height={100}
                    className="h-[110px] cursor-pointer rounded-lg border border-gray-400 object-cover shadow-sm transition-all duration-400 hover:scale-105 hover:shadow-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-700">
                      {item.item.title}
                    </h4>

                    <p className="mt-1 text-base text-gray-700 capitalize">
                      {item.size}
                    </p>
                    <p className="text-base text-gray-700 capitalize">
                      {item.color}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-4">
                    <button
                      onClick={() => cart.degreesQuantity(item.item._id)}
                      type="button"
                      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-700 p-1 text-xl text-[#0F925C] shadow-md"
                    >
                      <Minus />
                    </button>
                    <p className="text-center text-xl text-[#0F925C] sm:min-w-5">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => cart.ingressQuantity(item.item._id)}
                      type="button"
                      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-700 p-1 text-xl text-[#0F925C] shadow-md"
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="lg:ml-20">
                    <button
                      onClick={() => cart.removeItem(item.item._id)}
                      className="cursor-pointer text-2xl text-red-600 transition-all duration-300 hover:text-red-500"
                      type="button"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full rounded-md border bg-gray-100 px-4 shadow-sm md:w-1/3">
          <h3 className="my-5 border-b pb-1 text-2xl font-semibold text-gray-700">
            Summary (
            {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </h3>

          <div className="flex justify-between gap-3">
            <h4 className="text-lg font-semibold text-gray-600">
              Total Amount
            </h4>
            <p className="text-lg font-semibold text-gray-600">
              ${cart.cartItems.reduce((acc, item) => acc + item.item.price, 0)}
            </p>
          </div>

          <div className="mt-10">
            <button
              onClick={handleCheckout}
              className="w-full cursor-pointer rounded-md bg-[#0F925C] px-4 py-2 text-white transition-all duration-300 hover:bg-[#0f925cc4]"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default cart;

export const dynamic = "force-dynamic";
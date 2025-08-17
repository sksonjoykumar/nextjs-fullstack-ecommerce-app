"use client";
import { useCart } from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./navbar.css";
import { Input } from "./ui/input";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  const pathname = usePathname();
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();

  // handleSearch
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  // getUser
  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
    } catch (err) {
      console.log("[users_GET", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  console.log(signedInUser?.wishlist.length);
  return (
    <>
      <div className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white px-4 pt-3.5 md:px-16">
        <div className="flex items-center justify-between gap-2 sm:gap-10 md:gap-4">
          {/* logo  */}
          <Link href={"/"} className="logo">
            <h1 className="text-2xl font-semibold text-[#0F925C] sm:text-3xl">
              {" "}
              Buy<span className="text-[#FF014F]">ing</span>
            </h1>
          </Link>

          {/* SearchBar */}
          <div className="w-full max-w-2xl flex-1 md:px-12">
            <form
              onSubmit={handleSearch}
              className="w-full max-w-2xl flex-1 px-4"
            >
              <Input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="Search..."
                className="w-full border border-gray-300 text-sm text-gray-800"
              />
            </form>
          </div>
          {/* Desktop Icon */}
          {/* Wishlist, Cart, Account */}
          <div className="hidden items-center gap-6 text-base text-gray-700 md:flex">
            <Link
              title="Wishlist"
              href={"/wishlist"}
              className={`relative transition-all duration-200 hover:text-[#0F925C] ${
                pathname === "/wishlist" ? "active" : ""
              }`}
            >
              Wishlist
              <span className="absolute -top-4 -right-3 h-5 w-5 rounded-full bg-[#EF4444] text-center text-sm text-white">
                {signedInUser?.wishlist.length}
              </span>
            </Link>
            <Link
              title="Cart"
              href={"/cart"}
              className={`relative flex gap-1 transition-all duration-200 hover:text-[#0F925C] ${
                pathname === "/cart" ? "active" : ""
              }`}
            >
              {/* <ShoppingCart /> */}
              Cart
              <span className="absolute -top-4 -right-3 h-5 w-5 rounded-full bg-[#EF4444] text-center text-sm text-white">
                {cart.cartItems.length}
              </span>
            </Link>

            {/* account */}
            <button type="button">
              {user ? (
                <UserButton />
              ) : (
                <Link href={"/sign-in"}>
                  <CircleUserRound />
                </Link>
              )}
            </button>
          </div>

          {/* Mobile Icon */}
          <div className="sm:mr-5 md:mr-0 md:hidden">
            <button type="button" onClick={() => setMenu(!menu)}>
              <Menu className="mb-1 inline-block h-[27px] w-[27px] cursor-pointer" />
            </button>

            {/* responsive menu */}
            {menu && (
              <div className="absolute top-0 right-0 z-40 flex h-screen w-[200px] flex-col gap-6 border-l bg-white px-6 py-4 text-base text-gray-700">
                {/* close button */}
                <button
                  onClick={() => setMenu(!menu)}
                  className="mr-2 self-end"
                >
                  <X className="mb-1 inline-block h-[27px] w-[27px] cursor-pointer" />
                </button>

                {/* Wishlist, Cart, Account */}
                <div className="mt-7 flex flex-col items-center gap-10">
                  <Link
                    href="/wishlist"
                    className={`relative transition-all duration-200 hover:text-[#0F925C] ${
                      pathname === "/wishlist" ? "active" : ""
                    }`}
                    onClick={() => setMenu(!menu)}
                  >
                    Wishlist
                    <span className="absolute -top-4 -right-3 h-5 w-5 rounded-full bg-[#EF4444] text-center text-sm text-white">
                      {signedInUser?.wishlist.length}
                    </span>
                  </Link>
                  <Link
                    href="/cart"
                    className={`relative flex gap-1 transition-all duration-200 hover:text-[#0F925C] ${
                      pathname === "/cart" ? "active" : ""
                    }`}
                    onClick={() => setMenu(!menu)}
                  >
                    <ShoppingCart /> Cart
                    <span className="absolute -top-4 -right-3 h-5 w-5 rounded-full bg-[#EF4444] text-center text-sm text-white">
                      {cart.cartItems.length}
                    </span>
                  </Link>
                  {/* Profile */}
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray-800"
                  >
                    Profile
                    {user ? (
                      <UserButton />
                    ) : (
                      <Link href={"/sign-in"}>
                        <CircleUserRound />
                      </Link>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

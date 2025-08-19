"use client";

import { navLinks } from "@/lib/navicon";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserBtn from "../user-button/UserBtn";

export default function TopBar() {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const pathName = usePathname();

  return (
    <div className="sticky top-0 z-50 flex w-full justify-between border-b bg-slate-50 px-8 py-4 shadow-sm">
      {/* Desktop Menu */}
      <div className="flex items-center justify-between">
        <Link href={"/"} className="logo">
          <h1 className="text-2xl font-semibold text-[#0F925C] sm:text-3xl">
            {" "}
            Buy<span className="text-[#FF014F]">ing</span>
          </h1>
        </Link>
      </div>
      <div className="hidden items-center justify-between gap-1 text-base text-gray-800 sm:flex">
        {navLinks.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className={`rounded-sm p-2 hover:bg-gray-100 ${
              pathName === item.url ? "text-green" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <h1>{item.label}</h1>
            </div>
          </Link>
        ))}
        <UserBtn />
      </div>

      {/* Responsive Menu */}
      <div className="relative flex items-center gap-3 sm:hidden">
        {/* <button type="button" onClick={() => setDropDownMenu(!dropDownMenu)}>
          {dropDownMenu ? (
            <X className="mb-1 cursor-pointer" size={27} />
          ) : (
            <Menu className="mb-1 cursor-pointer" size={27} />
          )}
        </button> */}
        <button type="button" onClick={() => setDropDownMenu(!dropDownMenu)}>
          <Menu className="mb-1 cursor-pointer" size={27} />
        </button>
        <UserBtn />

        {dropDownMenu && (
          <div className="absolute -top-4 -right-8 z-50 h-screen w-[200px] rounded-md border bg-white p-2 px-4">
            <div className="flex flex-col gap-5 pt-4 text-base text-gray-800">
              <button
                type="button"
                onClick={() => setDropDownMenu(!dropDownMenu)}
                className="flex items-center justify-center transition-all duration-300 hover:text-red-500"
              >
                <X className="mb-1 cursor-pointer" size={27} />
              </button>
              {navLinks.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className={`rounded-sm p-2 hover:bg-gray-100 ${
                    pathName === item.url ? "text-green" : ""
                  }`}
                >
                  <div
                    onClick={() => setDropDownMenu(!dropDownMenu)}
                    className="flex items-center gap-4"
                  >
                    <div className="text-2xl" aria-setsize={20}>
                      {item.icon}
                    </div>
                    <h1>{item.label}</h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

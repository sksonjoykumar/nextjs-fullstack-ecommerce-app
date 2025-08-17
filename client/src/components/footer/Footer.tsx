"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import bank from "../../../public/bank/img.png";

const Footer: React.FC = () => {
  return (
    <div className="mt-4 border-t border-gray-200 px-4 pt-7 md:px-16">
      <div className="font-inter grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-10">
        {/* Logo & Description */}
        <div>
          <Link href={"/"} className="logo">
            <h1 className="text-2xl font-semibold text-[#0F925C] sm:text-3xl">
              {" "}
              Buy<span className="text-[#FF014F]">ing</span>
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad voluptatibus ipsam quisquam.
          </p>
          <ul className="my-2 mt-3 flex gap-2 space-x-1">
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">
                <Twitter size={20} />
              </Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">
                <Facebook size={20} />
              </Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">
                <Instagram size={20} />
              </Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">
                <Youtube size={20} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-base font-semibold text-[#0F925C] uppercase">
            Company
          </h4>
          <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">About</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Features</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Works</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Career</Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-base font-semibold text-[#0F925C] uppercase">
            Help
          </h4>
          <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Customer Support</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Delivery Details</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Terms & Conditions</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h4 className="text-base font-semibold text-[#0F925C] uppercase">
            FAQ
          </h4>
          <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Account</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Manage Deliveries</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Orders</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Payments</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-base font-semibold text-[#0F925C] uppercase">
            Resources
          </h4>
          <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Free eBooks</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">Development Tutorial</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">How to - Blog</Link>
            </li>
            <li className="transition-all duration-200 hover:text-[#3A80E9]">
              <Link href="#">YouTube Playlist</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-200 py-3">
        <p className="font-inter text-[.8rem] text-gray-500">
          Buying © 2020-2025, All Rights Reserved
        </p>
        <Image
          src={bank}
          alt="Bank logos"
          className="cursor-pointer rounded-sm border object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;

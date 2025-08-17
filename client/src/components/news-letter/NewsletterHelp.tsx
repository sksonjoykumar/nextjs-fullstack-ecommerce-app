"use client";

import { Mail, PhoneCall } from "lucide-react";
import React from "react";

const NewsletterHelp: React.FC = () => {
  return (
    <div className="my-10 flex flex-wrap items-center justify-center gap-10 rounded-md bg-gray-800 px-6 py-10 text-white md:px-20 lg:justify-between">
      {/* Newsletter Subscription */}
      <div>
        <div className="flex items-center gap-3">
          <Mail className="text-yellow-500" size={22} />
          <h3 className="font-semibold uppercase">
            Get Special Discounts In Your Inbox
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-300">
          Enter email to get offers, discount and more.
        </p>
        <div className="mt-4 flex max-w-md items-center border-b border-yellow-500 pb-1">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent py-2 text-sm outline-none"
          />
          <button className="rounded-md bg-yellow-600 px-4 py-2 text-sm text-white transition hover:bg-yellow-500">
            Subscribe
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div>
        <div className="flex items-center gap-3">
          <PhoneCall className="text-yellow-500" size={22} />
          <h3 className="font-semibold uppercase">
            For Any Help You May Call Us At
          </h3>
        </div>
        <p className="mt-2 text-sm">+1 (800) 123-4567</p>
        <p className="text-sm text-gray-300">
          Open 24 Hours a Day, 7 Days in week
        </p>
      </div>
    </div>
  );
};

export default NewsletterHelp;

'use client';

import { navLinks } from '@/lib/navicon';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import UserBtn from '../user-button/UserBtn';

export default function TopBar() {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const pathName = usePathname();

  return (
    <div className="sticky top-0 z-50 w-full flex justify-between  px-8 py-4 shadow-sm bg-slate-50 border-b ">
      {/* Desktop Menu */}
      <div className="flex items-center justify-between">
        <Link href={'/'} className="logo">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F925C] ">
            {' '}
            Buy<span className="text-[#FF014F]">ing</span>
          </h1>
        </Link>
      </div>
      <div className=" hidden sm:flex  items-center justify-between  gap-1 text-base text-gray-800 ">
        {navLinks.map(item => (
          <Link
            key={item.url}
            href={item.url}
            className={`hover:bg-gray-100 p-2 rounded-sm ${
              pathName === item.url ? 'text-green' : ''
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
      <div className="relative flex sm:hidden  gap-3 items-center ">
        <button type="button" onClick={() => setDropDownMenu(!dropDownMenu)}>
          {dropDownMenu ? (
            <X className="cursor-pointer mb-1" size={27} />
          ) : (
            <Menu className="cursor-pointer mb-1" size={27} />
          )}
        </button>
        <UserBtn />

        {dropDownMenu && (
          <div className="absolute top-[3.2rem]  -right-8 z-50  h-screen w-[200px] bg-white p-2  px-4 border rounded-md">
            <div className="flex flex-col  gap-5 text-base text-gray-800 ">
              {navLinks.map(item => (
                <Link
                  key={item.url}
                  href={item.url}
                  className={`hover:bg-gray-100 p-2 rounded-sm ${
                    pathName === item.url ? 'text-green' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
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

'use client';

import { navLinks } from '@/lib/navicon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserBtn from '../user-button/UserBtn';

export default function LeftSideBar() {
  const pathName = usePathname();
  return (
    <div className="h-screen left-0 top-0 sticky p-4 lg:p-8 flex flex-col gap-10 bg-slate-50 border-r shadow-md max-md:hidden ">
      <Link href={'/'} className="logo">
        <h1 className="text-3xl font-semibold text-[#0F925C] ">
          {' '}
          Buy<span className="text-[#FF014F]">ing</span>
        </h1>
      </Link>
      <div className="flex flex-col gap-5 text-lg text-gray-800 ">
        {navLinks.map(item => (
          <Link
            key={item.url}
            href={item.url}
            className={`hover:bg-gray-100 p-2 rounded-sm ${
              pathName === item.url ? 'text-green' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{item.icon}</div>
              <h1>{item.label}</h1>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-sm">
        <UserBtn />
        <p className="text-md text-gray-800">Edit Profile</p>
      </div>
    </div>
  );
}

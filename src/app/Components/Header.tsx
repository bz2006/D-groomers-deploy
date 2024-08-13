'use client';
import Link from 'next/link';
import {
  Disclosure,
} from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navigator from './DivNav';
import type { MenuProps } from 'antd';
import { Drawer, Button, Dropdown, Menu } from 'antd';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Breeds', href: '/breeds', current: false },
  { name: 'Who are we?', href: '/about', current: false },
  { name: 'Contact Us', href: '/contact-us', current: false },
];

type User = {
  email: string;
  username: string;
  updatedAt: string;
  _id: string;
};

interface HeaderProps {
  bgcolor?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Header: React.FC<HeaderProps> = ({ bgcolor }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const GetUser = async () => {
    try {
      const user = localStorage.getItem('_dgUSR');
      const userdet = user ? JSON.parse(user) : null;
      setUser(userdet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUser();
    const path = window.location.pathname;
    localStorage.setItem("redirect", JSON.stringify(path));
  }, []);

  const HandleLogout = async () => {
    try {
      document.cookie = "_grt5634=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      localStorage.removeItem('_dgUSR');
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const items: MenuProps['items'] = user != null ? [
    { key: '1', label: `Hi, ${user.username}` },
    { key: '2', label: <a href="/my-account">Your Account</a> },
    { key: '3', label: <a href="/my-account/my-pets">Your Pets</a> },
    { key: '4', label: <a href="/my-account/schedules">Schedules</a> },
    { key: '5', label: 'Log out', onClick: HandleLogout },
  ] : [
    {
      key: '1', label: (
        <div className="flex py-1">
          <Navigator path="/login" styles="bg-violet-900 min-w-24 h-11 hover:bg-violet-800 hover:text-white text-white font-bold text-center justify-center rounded flex items-center mr-3">
            Log In
          </Navigator>
          <Navigator path="/signup" styles="bg-violet-900 min-w-24 h-11 hover:bg-violet-800 hover:text-white text-white font-bold text-center justify-center rounded flex items-center">
            Sign Up
          </Navigator>
        </div>
      )
    }
  ];

  return (
    <Disclosure as="nav" className={bgcolor ? bgcolor : 'bg-transparent'}>
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px=2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-3 flex items-center sm:hidden">
                <Button
                  type="text"
                  onClick={showDrawer}
                  icon={<Bars3Icon className="block h-8 w-8 text-black" />}
                />
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src="/images/dgroomers.png" alt="d_groomers" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 justify-center">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-black text-sm hover:bg-gray-200 rounded-md px-3 py-2 font-medium"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <div className="flex items-center  bg-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>

          <Drawer
            placement="left"
            closable={false}
            onClose={closeDrawer}
            open={isDrawerVisible}
          >
            <div className='flex justify-between'>
              {user?.username ? (
                <h1 className='text-xl'>Hi, {user?.username}</h1>
              ) : (
                <a href='/login' className='text-xl text-blue-400 '>Login</a>
              )}

              <svg xmlns="http://www.w3.org/2000/svg" onClick={closeDrawer} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>


            </div>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-md py-2  text-2xl mt-5 font-medium text-gray-700 hover:bg-gray-100"
                onClick={closeDrawer}
              >
                {item.name}
              </a>
            ))}
          </Drawer>
        </>
      )}
    </Disclosure>
  );
};

export default Header;

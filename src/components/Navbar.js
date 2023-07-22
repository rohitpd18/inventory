"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const Navbar = () => {
  const router = useRouter()
  const [profileToggle, setProfileToggle] = useState(false);
  const [path, setPath] = useState(null);
  const [menuToggle, setMenuToggle] = useState(false);

  const handleProfile = () => {
    setProfileToggle(!profileToggle);
  };

  const handleMenu = () => {
    setMenuToggle(!menuToggle);
  };

  const closeProfileMenu = () => {
    setProfileToggle(false);
  };

  useEffect(() => {
    const newPath = window.location.pathname;
    setPath(newPath);
  }, []);
  const menu = [
    {
      id: "1",
      name: "Home",
      link: "/",
    },
    {
      id: "2",
      name: "Contact",
      link: "/contact",
    },
    {
      id: "3",
      name: "Pricing",
      link: "/pricing",
    },
    {
      id: "4",
      name: "About Us",
      link: "/aboutus",
    },
  ];

  const profileMenu = [
    {
      id: "1",
      name: "My Profile",
      link: "/profile",
    },
    {
      id: "2",
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      id: "3",
      name: "Settings",
      link: "/profile/settings",
    },
    {
      id: "4",
      name: "Logout",
      link: '/logout'
    },
  ];

  return (
    <nav className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              onClick={handleMenu}
              type="button"
              className="inline-flex text-color items-center justify-center rounded-md p-2 text-indigo-600  hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>

            {/*  */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                {menu.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      className={`${
                        path == item.link
                          ? "bg-white text-indigo-600"
                          : "text-black hover:bg-white hover:text-indigo-600"
                      }  rounded-md px-3 py-2 text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full bg-white p-1 text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            {/* <!-- Profile dropdown --> */}

            <div className="relative ml-3">
              <div>
                <button
                  onClick={handleProfile}
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facefocus:ring-offset-gray-8pad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
              {profileToggle && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                  {profileMenu.map((item) => {
                    return (
                      <Link
                        onClick={closeProfileMenu}
                        href={item.link}
                        key={item.id}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {menuToggle && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            {menu.map((item) => {
              return (
                <Link
                  href={item.link}
                  key={item.id}
                  className={
                    path == item.link
                      ? "bg-white text-indigo-600 block rounded-md px-3 py-2 text-base font-medium"
                      : "text-black hover:bg-white hover:text-indigo-600 block rounded-md px-3 py-2 text-base font-medium"
                  }
                >
                  {item.name} 
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

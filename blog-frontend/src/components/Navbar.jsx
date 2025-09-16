"use client";

import { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push("/");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 text-white relative z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-lg font-bold">BloggerIt 📒</Link>
              <div className="hidden sm:flex items-center space-x-4">
                {!user && (
                  <>
                    <Link href="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
                      Login
                    </Link>
                    <Link href="/signup" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
                      Signup
                    </Link>
                  </>
                )}
                {user && (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center focus:outline-none cursor-pointer"
                    >
                      <UserCircleIcon className="h-8 w-8 text-white" />
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setProfileOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="sm:hidden">
                <DisclosureButton className="p-2 rounded hover:bg-gray-700">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden absolute top-full left-0 w-full bg-gray-700 shadow-lg z-40">
            <div className="flex flex-col p-2 space-y-2">
              {!user && (
                <>
                  <Link href="/login" className="block w-full text-left bg-blue-500 px-3 py-2 rounded">
                    Login
                  </Link>
                  <Link href="/signup" className="block w-full text-left bg-green-500 px-3 py-2 rounded">
                    Signup
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    className="block w-full text-left px-3 py-2 rounded hover:bg-gray-600"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

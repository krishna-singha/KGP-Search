"use client";

import Link from "next/link";
import { useEffect, useCallback, useState } from "react";
import { IoArrowRedo } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import { provider } from "@/auth/firebase";
import {
  setUser,
  logout,
  fetchUser,
} from "@/lib/redux/features/user/userSlice";
import Image from "next/image";
import StylishButton from "./stylishBtn";
import logoDark from "@/assets/logo_dark.png";
import logoLight from "@/assets/logo_light.png";
import SearchBar from "./searchBar";
import Settings from "./settings";
import Filter from "./filter";
import { X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.darkMode.theme);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const toggle = (mode: string) => {
    if (mode === "settings") {
      setSettingsOpen(!settingsOpen);
      setFilterOpen(false);
      setUserOpen(false);
    } else if (mode === "filter") {
      setFilterOpen(!filterOpen);
      setSettingsOpen(false);
      setUserOpen(false);
    } else if (mode === "user") {
      setUserOpen(!userOpen);
      setSettingsOpen(false);
      setFilterOpen(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email, photoURL } = result.user;
      dispatch(setUser({ uid, displayName, email, photoURL }));
    } catch (error) {
      console.error(
        "Sign-in error:",
        error instanceof Error ? error.message : error
      );
    }
  }, [auth, dispatch]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error(
        "Sign-out error:",
        error instanceof Error ? error.message : error
      );
    }
  }, [auth, dispatch]);

  const fistname = (name: string) => {
    const firstName = name.split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  return (
    <nav className="bg-white border-b sticky top-0 py-2 z-50 shadow-md dark:bg-[#0f0f0f] dark:text-white dark:border-[#ffffff33] px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 gap-6 w-full">
        {/* Logo */}
        <div className="w-fit">
          <Link href="/" className="cursor-pointer">
            <div className="w-[4.5rem]">
              <Image
                src={theme === "light" ? logoLight : logoDark}
                alt="Logo"
                width={80}
                height={80}
              />
            </div>
          </Link>
        </div>

        {/* Search Bar (Only on search page) */}
        <div className={`w-full hidden md:flex`}>
          {pathname === "/search" && <SearchBar />}
        </div>

        {/* Desktop Menu Button */}
        <div className="w-fit hidden lg:flex items-center space-x-6 h-full">
          <div className="relative">
            {pathname === "/search" && (
              <>
                <div
                  className="hover:text-blue-600 transition-colors cursor-pointer font-semibold "
                  onClick={() => toggle("filter")}
                >
                  Filter
                </div>
                {filterOpen && (
                  <div className="absolute top-16 right-0 bg-white dark:bg-[#212121] shadow-lg rounded-lg p-4 w-fit space-y-1">
                    <Filter />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="">
            <Link
              href="/history"
              className="hover:text-blue-600 transition-colors font-semibold"
            >
              History
            </Link>
          </div>
          <div className="relative">
            <div
              className="hover:text-blue-600 transition-colors cursor-pointer font-semibold "
              onClick={() => toggle("settings")}
            >
              Settings
            </div>
            {settingsOpen && (
              <div className="absolute top-16 right-0 bg-white dark:bg-[#212121] shadow-lg rounded-lg p-4 w-fit space-y-1">
                <Settings />
              </div>
            )}
          </div>

          {user?.uid ? (
            <div
              className="w-[3rem] border-2 rounded-full p-1 cursor-pointer relative"
              onClick={() => toggle("user")}
            >
              <Image
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                width={100}
                height={100}
                className="rounded-full hover:scale-110"
              />
              {userOpen && (
                <div className="absolute top-16 right-0 bg-white dark:bg-[#212121] shadow-lg rounded-lg p-4 w-fit space-y-1">
                  <div className="flex flex-col items-center justify-center py-4">
                    <Image
                      src={user.photoURL || "/default-avatar.png"}
                      alt="User"
                      width={60}
                      height={60}
                      className="rounded-full shadow-md border border-gray-300 dark:border-gray-600"
                    />
                    <p className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">
                      Hi, {user.displayName && fistname(user.displayName)}! 👋
                    </p>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </span>

                    <button
                      onClick={handleSignOut}
                      className="mt-3 px-5 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <StylishButton variant="primary" onClick={handleGoogleSignIn}>
              Login
            </StylishButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-700 dark:text-[#bfbfbf]"
          onClick={() => setIsSidebarOpen(true)}
        >
          <div className="flex items-center justify-center w-[3rem] border-2 rounded-full p-1 cursor-pointer">
            <Image
              src={user?.photoURL || "/avatar.svg"}
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/80 dark:bg-[#212121]/80 backdrop-blur-lg shadow-xl rounded-l-3xl z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-700`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Menu
          </h2>
          <button
            className="text-gray-700 dark:text-gray-300 hover:text-red-500 transition-all"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={26} />
          </button>
        </div>

        {user?.uid ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Image
              src={user.photoURL || "/avatar.svg"}
              alt="User"
              width={75}
              height={75}
              className="rounded-full shadow-md border border-gray-300 dark:border-gray-600"
            />
            <p className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">
              Hi, {user.displayName && fistname(user.displayName)}! 👋
            </p>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </span>

            <button
              onClick={handleSignOut}
              className="mt-3 px-5 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-6">
            <Image
              src="/avatar.svg"
              alt="Default Avatar"
              width={70}
              height={70}
              className="rounded-full shadow-md border border-gray-300 dark:border-gray-600"
            />
            <p className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-200">
              Welcome, Guest!
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="mt-3 px-5 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
            >
              Login
            </button>
          </div>
        )}

        <div className="p-4 flex flex-col space-y-4 mt-4">
          <Link
            href="/history"
            className="flex items-center space-x-2 text-gray-800 dark:text-white font-semibold hover:text-blue-600 transition-all"
          >
            <IoArrowRedo size={20} className="text-blue-500" />
            <span>History</span>
          </Link>

          <Settings />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

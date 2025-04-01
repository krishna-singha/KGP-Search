"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "@/auth/firebase";
import { User } from "@/lib/interface";
import StylishButton from "./stylishBtn";
import SearchBar from "./searchBar";
import Settings from "./settings";
import Filter from "./filter";
import logo from "@/assets/3.png";

const Navbar = () => {
  const pathname = usePathname();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [dropdown, setDropdown] = useState<
    "filters" | "settings" | "user" | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe; // Cleanup on unmount
  }, [auth]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Sign-In
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error: any) {
      console.error("Sign-in error:", error.message);
    }
  }, [auth]);

  // Handle Sign-Out
  const handleSignOut = useCallback(async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.error("Sign-out error:", error.message);
    }
  }, [auth]);

  // Toggle dropdowns
  const toggleDropdown = useCallback(
    (menu: "filters" | "settings" | "user") => {
      setDropdown((prev) => (prev === menu ? null : menu));
    },
    []
  );

  return (
    <nav className="bg-white border-b sticky top-0 py-2 z-50 shadow-md dark:bg-[#0f0f0f] dark:text-white dark:border-[#ffffff33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4 h-16">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <Image src={logo} alt="Logo" width={80} height={80} />
        </Link>

        {/* Search Bar */}
        {pathname === "/search" && <SearchBar />}

        {/* Navigation Controls */}
        <div
          ref={dropdownRef}
          className="relative flex items-center space-x-6 text-gray-700 dark:text-[#bfbfbf]"
        >
          {pathname === "/search" && (
            <div
              className="cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => toggleDropdown("filters")}
            >
              Filters
              {dropdown === "filters" && (
                <div className="absolute top-16 left-0 w-48 bg-white border shadow-lg p-2 rounded-md dark:bg-[#212121] dark:border-[#ffffff33]">
                  <Filter />
                </div>
              )}
            </div>
          )}

          {/* History */}
          <Link
            href="/history"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            History
          </Link>

          {/* Settings */}
          <div
            className="relative cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => toggleDropdown("settings")}
          >
            Settings
            {dropdown === "settings" && (
              <div className="absolute top-14 right-0 w-80 bg-white border shadow-lg rounded-xl p-4 flex flex-col gap-2 dark:bg-[#212121] dark:border-[#ffffff33]">
                <Settings />
              </div>
            )}
          </div>

          {/* User Profile/Login */}
          {user ? (
            <div
              className="relative w-12 flex items-center gap-2 cursor-pointer border border-gray-300 rounded-full p-1"
              onClick={() => toggleDropdown("user")}
            >
              <Image
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                width={160}
                height={160}
                className="rounded-full"
              />
              {dropdown === "user" && (
                <div className="absolute top-16 right-0 w-64 bg-white border shadow-lg rounded-xl p-4 flex flex-col gap-3 dark:bg-[#212121] dark:border-[#ffffff33]">
                  <span className="text-lg font-semibold dark:text-white">
                    {user.displayName || "Anonymous"}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-[#bfbfbf]">
                    {user.email || "No email"}
                  </span>
                  <StylishButton variant="danger" onClick={handleSignOut}>
                    Sign Out
                  </StylishButton>
                </div>
              )}
            </div>
          ) : (
            <StylishButton variant="primary" onClick={handleGoogleSignIn}>
              Login
            </StylishButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

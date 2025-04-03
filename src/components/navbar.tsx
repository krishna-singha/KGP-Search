"use client";

import Link from "next/link";
import { useEffect, useCallback, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import { provider } from "@/auth/firebase";
import { setUser, logout, fetchUser } from "@/lib/redux/features/user/userSlice";
import Image from "next/image";
import StylishButton from "./stylishBtn";
import logoDark from "@/assets/logo_dark.png";
import logoLight from "@/assets/logo_light.png";
import SearchBar from "./searchBar";
import Settings from "./settings";
import Filter from "./filter";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = useAppSelector((state) => state.user) as { uid?: string; displayName?: string; email?: string; photoURL?: string };
  const theme = useAppSelector((state) => state.darkMode.theme);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropdown, setDropdown] = useState<"filters" | "settings" | "user" | null>(null);

  const toggleDropdown = useCallback(
    (menu: "filters" | "settings" | "user") => {
      setDropdown((prev) => (prev === menu ? null : menu));
    },
    []
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email, photoURL } = result.user;
      dispatch(setUser({ uid, displayName, email, photoURL }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Sign-in error:", error.message);
      } else {
        console.error("Unexpected sign-in error:", error);
      }
    }
  }, [auth, dispatch]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Sign-out error:", error.message);
      } else {
        console.error("Unexpected sign-out error:", error);
      }
    }
  }, [auth, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(null);
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <nav className="bg-white border-b sticky top-0 py-2 z-50 shadow-md dark:bg-[#0f0f0f] dark:text-white dark:border-[#ffffff33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4 h-16">
        <Link href="/" className="cursor-pointer">
          <Image src={theme === "light" ? logoLight : logoDark} alt="Logo" width={80} height={80} />
        </Link>

        {pathname === "/search" && <SearchBar />}

        <div className="relative flex items-center space-x-6 text-gray-700 dark:text-[#bfbfbf]">
          {pathname === "/search" && (
            <div className="relative cursor-pointer hover:text-blue-600 transition-colors" onClick={() => toggleDropdown("filters")}>
              Filters
              {dropdown === "filters" && (
                <div ref={dropdownRef} className="absolute top-14 left-0 w-48 bg-white border shadow-lg p-2 rounded-md dark:bg-[#212121] dark:border-[#ffffff33]">
                  <Filter />
                </div>
              )}
            </div>
          )}

          <Link href="/history" className="text-sm font-medium hover:text-blue-600 transition-colors">
            History
          </Link>

          <div className="relative cursor-pointer hover:text-blue-600 transition-colors" onClick={() => toggleDropdown("settings")}>
            Settings
            {dropdown === "settings" && (
              <div ref={dropdownRef} className="absolute top-14 right-0 w-80 bg-white border shadow-lg rounded-xl p-4 flex flex-col gap-2 dark:bg-[#212121] dark:border-[#ffffff33]">
                <Settings />
              </div>
            )}
          </div>

          {user.uid ? (
            <div className="relative w-12 flex items-center gap-2 cursor-pointer border border-gray-300 rounded-full p-1" onClick={() => toggleDropdown("user")}>
              <Image src={user.photoURL || "/default-avatar.png"} alt="User" width={40} height={40} className="rounded-full" />
              {dropdown === "user" && (
                <div ref={dropdownRef} className="absolute top-16 right-0 w-64 bg-white border shadow-lg rounded-xl p-4 flex flex-col gap-3 dark:bg-[#212121] dark:border-[#ffffff33]">
                  <span className="text-lg font-semibold dark:text-white">{user.displayName || "Anonymous"}</span>
                  <span className="text-sm text-gray-600 dark:text-[#bfbfbf]">{user.email || "No email"}</span>
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
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
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.darkMode.theme);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropdown, setDropdown] = useState<"filters" | "settings" | "user" | null>(null);
  const [settingsChanged, setSettingsChanged] = useState(false);

  const toggleDropdown = useCallback(
    (menu: "filters" | "settings" | "user") => {
      setDropdown((prev) => (prev === menu ? null : menu));
    },
    []
  );

  // Fetch user on mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Handle Google Sign-In
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email, photoURL } = result.user;
      dispatch(setUser({ uid, displayName, email, photoURL }));
    } catch (error: any) {
      console.error("Sign-in error:", error.message);
    }
  }, [auth, dispatch]);

  // Handle Sign-Out
  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error: any) {
      console.error("Sign-out error:", error.message);
    }
  }, [auth, dispatch]);

  // Detect clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (dropdown === "settings" && settingsChanged) {
          setTimeout(() => window.location.reload(), 200); // Refresh if settings were changed
        }
        setDropdown(null);
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown, settingsChanged]);

  
  return (
    <nav className="bg-white border-b sticky top-0 py-2 z-50 shadow-md dark:bg-[#0f0f0f] dark:text-white dark:border-[#ffffff33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4 h-16">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          {theme === "light" ? (
            <Image src={logoLight} alt="Logo" width={80} height={80} />
          ) : (
            <Image src={logoDark} alt="Logo" width={80} height={80} />
          )}
        </Link>

        {/* Search Bar */}
        {pathname === "/search" && <SearchBar />}

        {/* Navigation Controls */}
        <div ref={dropdownRef} className="relative flex items-center space-x-6 text-gray-700 dark:text-[#bfbfbf]">
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
          <Link href="/history" className="text-sm font-medium hover:text-blue-600 transition-colors">
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
                <Settings onSettingsChange={() => setSettingsChanged(true)} />
              </div>
            )}
          </div>

          {/* User Profile/Login */}
          {user.uid ? (
            <div
              className="relative w-12 flex items-center gap-2 cursor-pointer border border-gray-300 rounded-full p-1"
              onClick={() => toggleDropdown("user")}
            >
              <Image src={user.photoURL || "/default-avatar.png"} alt="User" width={40} height={40} className="rounded-full" />
              {dropdown === "user" && (
                <div className="absolute top-16 right-0 w-64 bg-white border shadow-lg rounded-xl p-4 flex flex-col gap-3 dark:bg-[#212121] dark:border-[#ffffff33]">
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

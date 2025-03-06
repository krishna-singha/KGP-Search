"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "@/auth/firebase";
import { User } from "@/lib/interface";
import StylishButton from "./stylishBtn";
import SearchBar from "./searchBar";
import Settings from "./settings";
import Filter from "./filter";

const Navbar = () => {
  const pathname = usePathname();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [dropdown, setDropdown] = useState<
    "filters" | "settings" | "user" | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error: any) {
      console.error("Sign-in error:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.error("Sign-out error:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

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

  return (
    <nav className="bg-white border-b sticky top-0 py-2 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4 h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 text-nowrap">
          KGP Search
        </Link>

        {/* Search Bar (Only visible on /search) */}
        {pathname === "/search" && <SearchBar />}

        {/* Right Menu */}
        <div className="relative flex items-center space-x-6" ref={dropdownRef}>
          {pathname === "/search" && (
            <div
              className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() =>
                setDropdown(dropdown === "filters" ? null : "filters")
              }
            >
              Filters
              {dropdown === "filters" && (
                <div className="absolute top-16 left-0 w-48 bg-white border shadow-lg p-2 rounded-md">
                  <Filter />
                </div>
              )}
            </div>
          )}

          {/* History */}
          <Link
            href="/history"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            History
          </Link>

          {/* Settings */}
          <div
            className="relative cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() =>
              setDropdown(dropdown === "settings" ? null : "settings")
            }
          >
            Settings
            {dropdown === "settings" && (
              <div className="absolute top-14 right-0 w-80 bg-white border shadow-lg rounded-xl p-4 flex flex-col gap-2">
                <Settings />
              </div>
            )}
          </div>

          {/* User Profile/Login */}
          {user ? (
            <div
              className="w-12 flex items-center gap-2 cursor-pointer border border-gray-300 rounded-full p-1"
              onClick={() => setDropdown(dropdown === "user" ? null : "user")}
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              {dropdown === "user" && (
                <div className="absolute top-16 right-0 w-64 bg-white border shadow-lg rounded-xl p-4 flex flex-col gap-3">
                  <span className="text-lg font-semibold">
                    {user.displayName || "Anonymous"}
                  </span>
                  <span className="text-sm text-gray-600">
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

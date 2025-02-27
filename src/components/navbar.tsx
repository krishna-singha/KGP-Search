"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StylishButton from "./stylishBtn";
import SearchBar from "./searchBar";
import { usePathname } from "next/navigation";
import Settings from "./settings";
import Filter from "./filter";

const Navbar = () => {
  const pathname = usePathname();

  const [showFilters, setShowFilters] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest(".filter-container") &&
        showFilters
      ) {
        setShowFilters(false);
      }
      if (
        !(event.target as HTMLElement).closest(".settings-container") &&
        showSettings
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showFilters, showSettings]);

  return (
    <nav className="bg-white border-b sticky top-0 py-2 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-6 h-16 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-gray-900 text-nowrap">
              KGP Search
            </span>
          </Link>

          {/* Search Bar (Only visible on /search) */}
          {pathname === "/search" && (
            <div className="w-full">
              <SearchBar />
            </div>
          )}

          {/* Right Side Menu */}
          <div className="relative flex items-center space-x-6">
            {pathname === "/search" && (
              <div
                className="cursor-pointer"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                Filters
                {showFilters && (
                  <div className="absolute top-10 left-0 w-48 bg-white border shadow-md p-2 rounded-md">
                    <Filter />
                  </div>
                )}
              </div>
            )}

            {/* History Link */}
            <Link
              href="/history"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              History
            </Link>

            {/* Settings */}
            <div
              className="relative settings-container cursor-pointer"
              onClick={() => setShowSettings((prev) => !prev)}
            >
              Settings
              {showSettings && (
                <div className="absolute top-10 right-0 w-48 bg-white border shadow-md p-2 rounded-md">
                  <Settings />
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link href="/login">
              <StylishButton variant="primary">Login</StylishButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

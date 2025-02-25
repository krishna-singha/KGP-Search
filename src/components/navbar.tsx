"use client";

import { useState } from "react";
import Link from "next/link";
import StylishButton from "./stylishBtn";
import SearchBar from "./searchBar";
import { usePathname } from "next/navigation";
import Settings from "./settings";

const Navbar = () => {
  const pathname = usePathname();

  const navigation = [{ name: "History", href: "/history" }];

  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings((prev) => !prev);

  return (
    <nav className="bg-white border-b sticky top-0 py-2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 w-full gap-4">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold text-nowrap">
                KGP Search
              </span>
            </Link>
          </div>

          <div
            className={`w-full ${
              pathname === "/search" ? "flex items-center" : "hidden"
            }`}
          >
            <SearchBar />
          </div>

          <div className="relative hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div onClick={toggleSettings} className="cursor-pointer">
              Settings
            </div>
            {showSettings && <Settings />}
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

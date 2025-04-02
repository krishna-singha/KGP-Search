"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const usrQuery = searchParams.get("query") || "";
  const filter = useAppSelector((state) => state.filter.value);
  

  const [query, setQuery] = useState(usrQuery);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 3) return;
    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}&filter=${filter}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-md w-full dark:bg-[#212121] dark:border-[#ffffff33]"
    >
      <FaSearch className="text-gray-500 mr-3" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the web..."
        className="w-full bg-transparent outline-none text-black placeholder-gray-400 dark:text-white"
      />
      {query && (
        <button type="button" className="ml-2" onClick={() => setQuery("")} aria-label="Clear search">
          <X className="font-bold cursor-pointer hover:scale-125" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;

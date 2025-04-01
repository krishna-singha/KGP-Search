"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const usrQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(usrQuery);

  useEffect(() => {
    setQuery(usrQuery);
  }, [usrQuery]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    if (query.length < 3) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleClear = () => setQuery("");

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
      {query && <X className="ml-2 font-bold cursor-pointer hover:scale-125" onClick={handleClear} />}
    </form>
  );
};

export default SearchBar;

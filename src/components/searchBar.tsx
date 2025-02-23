"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    console.log(`Searching for: ${query}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-md w-full max-w-lg"
    >
      <FaSearch className="text-gray-500 mr-3" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the web..."
        className="w-full bg-transparent outline-none text-black placeholder-gray-400"
      />
    </form>
  );
};

export default SearchBar;

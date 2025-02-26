"use client";

import { useState } from "react";
import Link from "next/link";
import { FaSearch, FaTrash } from "react-icons/fa";

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([
    "Decentralized chat apps",
    "Best Next.js state management",
    "How to implement anonymous search",
    "IPFS file sharing tutorial",
    "Web3 authentication methods",
  ]);

  // Delete a single history item
  const deleteHistoryItem = (index: number) => {
    setSearchHistory((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all history
  const clearAllHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-900 py-4 px-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🔍 Search History
      </h1>
      <div className="flex justify-end mb-3 w-full">
        <button
          onClick={clearAllHistory}
          className="text-red-600 text-sm flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-400 bg-white/70 backdrop-blur-md shadow-md transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg"
        >
          <FaTrash className="text-sm" /> Clear All
        </button>
      </div>

      <div className="w-full bg-white shadow-md rounded-xl p-5 border border-gray-200">
        {searchHistory.length > 0 ? (
          <>
            <ul className="space-y-4">
              {searchHistory.map((query, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between group hover:bg-gray-100 p-3 rounded-lg transition"
                >
                  <Link
                    href={`/search?q=${query}`}
                    className="text-blue-600 font-medium flex items-center gap-3 hover:underline"
                  >
                    <FaSearch className="text-gray-500 group-hover:text-blue-600 transition" />
                    {query}
                  </Link>
                  <button
                    onClick={() => deleteHistoryItem(index)}
                    className="text-gray-500 hover:scale-125 transition"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-500 text-center">No search history found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

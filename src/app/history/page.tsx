"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAppSelector } from "@/lib/redux/hooks";
import { format, parseISO } from "date-fns";

type SearchHistoryItem = {
  searchid: string;
  type: string;
  url: string;
  query: string;
  time: string;
};

const HistoryPage = () => {
  const user = useAppSelector((state) => state.user);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`/api/history?user_id=${user.uid}`);
      setSearchHistory(response.data.searchHistory || []);
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  };

  useEffect(() => {
    if (!user?.uid) return;
    fetchHistory();
  }, [user?.uid]);

  const deleteHistoryItem = async (searchid: string) => {
    await axios.delete(`/api/history?user_id=${user.uid}&searchid=${searchid}`);
    setSearchHistory((prev) =>
      prev.filter((item) => item.searchid !== searchid)
    );
  };

  const clearAllHistory = async () => {
    await axios.delete(`/api/history?user_id=${user.uid}&searchid=all`);
    setSearchHistory([]);
  };

  // Group history by date
  const groupedHistory = searchHistory
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .reduce((acc, item) => {
      const dateKey = format(parseISO(item.time), "MMM d, yyyy");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {} as Record<string, SearchHistoryItem[]>);

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <div className="w-full max-w-3xl bg-white/80 dark:bg-[#1e1e1e]/80 shadow-lg rounded-xl p-6 pt-0 mt-6 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-200 mb-4">
            🔍 Search History
          </h1>
          {searchHistory.length > 0 && (
            <button
              onClick={clearAllHistory}
              className="text-red-600 text-sm flex items-center gap-1 px-4 py-2 cursor-pointer rounded-md border border-red-400 backdrop-blur-md shadow-md transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg bg-transparent dark:text-red-500 dark:hover:text-white"
            >
              <FaTrash /> Clear All
            </button>
          )}
        </div>
        <div className="overflow-y-scroll max-h-[100vh] pr-8">
          {Object.keys(groupedHistory).length > 0 ? (
            <ul className="space-y-6">
              {Object.entries(groupedHistory).map(([date, items]) => (
                <div key={date} className="space-y-4">
                  <h2 className="text-sm text-gray-500 dark:text-gray-400 font-semibold my-2">
                    {date}
                  </h2>
                  {items.map((item) => (
                    <li
                      key={item.searchid}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-[#262626] hover:shadow-md transition-all"
                    >
                      <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {item.query}
                        </p>
                        <Link
                          href={item.url}
                          className="text-blue-600 flex items-center gap-2 text-sm hover:underline dark:text-blue-400"
                        >
                          <FaSearch className="text-gray-500 dark:text-gray-400 w-fit" />
                          <div className="w-full">{item.url}</div>
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {format(parseISO(item.time), "hh:mm a")}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteHistoryItem(item.searchid)}
                        className="text-gray-400 hover:text-red-500 transition-transform transform hover:scale-110"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center text-lg">
              No search history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

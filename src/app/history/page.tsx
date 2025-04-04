"use client";

import { useState, useEffect, useRef } from "react";
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
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!user?.uid || hasFetched.current) return;
    hasFetched.current = true;

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/history?user_id=${user.uid}`);
        setSearchHistory(response.data.searchHistory || []);
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };

    fetchHistory();
  }, [user?.uid]);

  const deleteHistoryItem = async (searchid: string) => {
    try {
      await axios.delete(
        `/api/history?user_id=${user.uid}&searchid=${searchid}`
      );
      setSearchHistory((prev) =>
        prev.filter((item) => item.searchid !== searchid)
      );
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  };

  const clearAllHistory = async () => {
    try {
      await axios.delete(`/api/history?user_id=${user.uid}&searchid=all`);
      setSearchHistory([]);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  const groupedHistory = searchHistory
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .reduce((acc, item) => {
      const dateKey = format(parseISO(item.time), "MMM d, yyyy");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {} as Record<string, SearchHistoryItem[]>);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 r">
      <div className="w-full max-w-3xl bg-white/90 dark:bg-[#1e1e1e]/80 shadow-2xl rounded-xl p-4 sm:p-6 mt-6 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            🔍 Search History
          </h1>
          {searchHistory.length > 0 && (
            <button
              aria-label={`delete-all-history`}
              onClick={clearAllHistory}
              className="text-sm sm:text-base text-white flex items-center gap-2 px-4 py-2 rounded-md border border-red-500 bg-red-600 shadow-md hover:bg-red-700 transition-all"
            >
              <FaTrash /> Clear All
            </button>
          )}
        </div>

        <div className="overflow-y-auto max-h-[70vh] pr-2">
          {Object.keys(groupedHistory).length > 0 ? (
            <ul className="space-y-4">
              {Object.entries(groupedHistory).map(([date, items]) => (
                <div key={date} className="space-y-3">
                  <h2 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold my-2">
                    {date}
                  </h2>
                  {items.map((item) => (
                    <li
                      key={item.searchid}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg hover:bg-white hover:dark:bg-[#262626] shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-[#ffffff33]"
                    >
                      <div className="w-full">
                        <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white break-words">
                          {item.query}
                        </p>
                        <Link
                          href={item.url}
                          className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2 mt-1 hover:underline"
                        >
                          <FaSearch className="text-gray-500 dark:text-gray-400" />
                          <span className="truncate w-full">{item.url}</span>
                        </Link>
                        <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {format(parseISO(item.time), "hh:mm a")}
                        </p>
                      </div>
                      <div className=" flex justify-end ">
                        <button
                          aria-label={`delete-history-${item.searchid}`}
                          onClick={() => deleteHistoryItem(item.searchid)}
                          className="text-gray-400 hover:text-red-500 transition-transform transform hover:scale-110"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mt-8">
              No search history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

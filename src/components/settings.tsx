"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaMoon, FaSun, FaHistory } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleTheme } from "@/lib/redux/features/darkMode/darkModeSlice";
import { toggleHistoryMode } from "@/lib/redux/features/historyMode/historyModeSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.darkMode.theme);
  const historyMode = useAppSelector((state) => state.historyMode.enabled);
  const user = useAppSelector((state) => state.user);

  return (
    <>
      {/* Dark Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-black transition"
        onClick={() => dispatch(toggleTheme())}
      >
        <div className="flex items-center gap-2 text-gray-800 dark:text-[#bfbfbf] text-nowrap">
          {theme === "dark" ? (
            <FaMoon className="text-blue-400" />
          ) : (
            <FaSun className="text-yellow-500" />
          )}
          Dark Mode
        </div>
        <div
          className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
            theme === "dark" ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              theme === "dark" ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* History Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-2 gap-6 rounded-lg hover:bg-gray-100 dark:hover:bg-black transition"
        onClick={() => dispatch(toggleHistoryMode())}
      >
        <div className="flex items-center gap-2 text-gray-800 dark:text-[#bfbfbf] text-nowrap">
          <FaHistory className="text-gray-700 dark:text-white" />
          Search History
        </div>
        <div
          className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
            historyMode && user?.uid ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              historyMode && user?.uid ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Feedback Button */}
      <div className="flex items-center justify-center mt-4">
        <Link
          href="/send-feedback"
          className="mt-3 text-center text-blue-600 font-semibold hover:underline transition"
        >
          Send Feedback
        </Link>
      </div>
    </>
  );
};

export default Settings;

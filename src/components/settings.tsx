"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaMoon,
  FaSun,
  FaFont,
  FaGlobe,
  FaLock,
  FaHistory,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleTheme } from "@/lib/redux/features/darkMode/darkModeSlice";
import { toggleAnonymous } from "@/lib/redux/features/anonymousMode/anonymousModeSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.darkMode.theme);
  const [anonymous, setAnonymous] = useState<boolean | null>(null);
  const [historyMode, setHistoryMode] = useState<boolean | null>(null);
  const [fontSize, setFontSize] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHistoryMode(
        localStorage.getItem("historyMode")
          ? localStorage.getItem("historyMode") === "true"
          : true
      );
      setFontSize(localStorage.getItem("fontSize") || "medium");
      setLanguage(localStorage.getItem("language") || "English");
      setAnonymous(
        localStorage.getItem("anonymous")
          ? localStorage.getItem("anonymous") === "true"
          : false
      );
    }
  }, []);

  const handleSearchHistory = () => {
    localStorage.setItem("historyMode", (!historyMode).toString());
    setHistoryMode(!historyMode);
  };

  const handleAnonymousMode = () => {
    dispatch(toggleAnonymous(!anonymous));
    localStorage.setItem("anonymous", (!anonymous).toString());
  };

  const handleFontSize = (size: string) => {
    localStorage.setItem("fontSize", size);
    setFontSize(size);
  };

  const handleLanguage = (lang: string) => {
    localStorage.setItem("language", lang);
    setLanguage(lang);
  };

  // Prevent rendering until client state is initialized
  if (historyMode === null || fontSize === null || language === null) {
    return null;
  }

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700">Settings</h2>

      {/* Dark Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => dispatch(toggleTheme())}
      >
        <span className="flex items-center gap-2 text-gray-800">
          {theme === "dark" ? (
            <FaMoon className="text-blue-400" />
          ) : (
            <FaSun className="text-yellow-500" />
          )}
          Dark Mode
        </span>
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
        className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={handleSearchHistory}
      >
        <span className="flex items-center gap-2 text-gray-800">
          <FaHistory className="text-gray-700" />
          Search History
        </span>
        <div
          className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
            historyMode ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              historyMode ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Anonymous Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={handleAnonymousMode}
      >
        <span className="flex items-center gap-2 text-gray-800">
          <FaLock className="text-gray-700" />
          Anonymous Mode
        </span>
        <div
          className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
            anonymous ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              anonymous ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Font Size Selector */}
      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition">
        <span className="flex items-center gap-2 text-gray-800">
          <FaFont className="text-blue-500" />
          Font Size
        </span>
        <select
          className="bg-gray-200 text-gray-800 p-1 rounded-md cursor-pointer"
          value={fontSize}
          onChange={(e) => handleFontSize(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Language Selector */}
      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition">
        <span className="flex items-center gap-2 text-gray-800">
          <FaGlobe className="text-green-500" />
          Language
        </span>
        <select
          className="bg-gray-200 text-gray-800 p-1 rounded-md cursor-pointer"
          value={language}
          onChange={(e) => handleLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Bengali">Bengali</option>
        </select>
      </div>

      {/* Feedback Button */}
      <Link
        href="/send-feedback"
        className="mt-3 text-center text-blue-600 font-semibold hover:underline transition"
      >
        Send Feedback
      </Link>
    </>
  );
};

export default Settings;

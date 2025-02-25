"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaMoon,
  FaSun,
  FaFont,
  FaGlobe,
  FaLock,
  FaHistory,
} from "react-icons/fa";

const Settings = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [historyMode, setHistoryMode] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [language, setLanguage] = useState("English");

  return (
    <div className="absolute top-16 right-0 shadow-lg bg-white border border-gray-200 rounded-xl w-80 p-4 flex flex-col gap-3 transition-all duration-300">
      <h2 className="text-lg font-semibold text-gray-700">Settings</h2>

      {/* Dark Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setDarkTheme(!darkTheme)}
      >
        <span className="flex items-center gap-2 text-gray-800">
          {darkTheme ? (
            <FaMoon className="text-blue-600" />
          ) : (
            <FaSun className="text-yellow-500" />
          )}
          Dark Mode
        </span>
        <div
          className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 ${
            darkTheme ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              darkTheme ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* History Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setHistoryMode(!historyMode)}
      >
        <span className="flex items-center gap-2 text-gray-800">
          <FaHistory className="text-gray-700" />
          Search History
        </span>
        <div
          className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 ${
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
        onClick={() => setAnonymousMode(!anonymousMode)}
      >
        <span className="flex items-center gap-2 text-gray-800">
          <FaLock className="text-gray-700" />
          Anonymous Mode
        </span>
        <div
          className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 ${
            anonymousMode ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              anonymousMode ? "translate-x-5" : "translate-x-0"
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
          onChange={(e) => setFontSize(e.target.value)}
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
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Spanish">Hindi</option>
          <option value="French">Bengali</option>
        </select>
      </div>

      {/* Feedback Button */}
      <Link
        href="/send-feedback"
        className="mt-3 text-center text-blue-600 font-semibold hover:underline transition"
      >
        Send Feedback
      </Link>
    </div>
  );
};

export default Settings;

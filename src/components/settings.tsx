"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaMoon, FaSun, FaFont, FaGlobe, FaLock, FaHistory } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleTheme } from "@/lib/redux/features/darkMode/darkModeSlice";
import { toggleAnonymous } from "@/lib/redux/features/anonymousMode/anonymousModeSlice";

// Define Settings State Type
type SettingsState = {
  anonymous: boolean;
  historyMode: boolean;
  fontSize: string;
  language: string;
};

const Settings = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.darkMode.theme);

  // Consolidated State for Settings
  const [settings, setSettings] = useState<SettingsState>({
    anonymous: false,
    historyMode: true,
    fontSize: "medium",
    language: "English",
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSettings({
        anonymous: localStorage.getItem("anonymous") === "true",
        historyMode: localStorage.getItem("historyMode") !== "false",
        fontSize: localStorage.getItem("fontSize") || "medium",
        language: localStorage.getItem("language") || "English",
      });
    }
  }, []);

  // Generic function to update state & localStorage
  const updateSetting = useCallback(
    <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      localStorage.setItem(key, value.toString());
    },
    []
  );

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Settings</h2>

      {/* Dark Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-black transition"
        onClick={() => dispatch(toggleTheme())}
      >
        <span className="flex items-center gap-2 text-gray-800 dark:text-[#bfbfbf]">
          {theme === "dark" ? <FaMoon className="text-blue-400" /> : <FaSun className="text-yellow-500" />}
          Dark Mode
        </span>
        <div className={`w-10 h-5 flex items-center rounded-full p-1 transition ${theme === "dark" ? "bg-green-500" : "bg-gray-400"}`}>
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`} />
        </div>
      </div>

      {/* History Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-black transition"
        onClick={() => updateSetting("historyMode", !settings.historyMode)}
      >
        <span className="flex items-center gap-2 text-gray-800 dark:text-[#bfbfbf]">
          <FaHistory className="text-gray-700 dark:text-white" />
          Search History
        </span>
        <div className={`w-10 h-5 flex items-center rounded-full p-1 transition ${settings.historyMode ? "bg-green-500" : "bg-gray-400"}`}>
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${settings.historyMode ? "translate-x-5" : "translate-x-0"}`} />
        </div>
      </div>

      {/* Anonymous Mode Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-black transition"
        onClick={() => {
          dispatch(toggleAnonymous(!settings.anonymous));
          updateSetting("anonymous", !settings.anonymous);
        }}
      >
        <span className="flex items-center gap-2 text-gray-800 dark:text-[#bfbfbf]">
          <FaLock className="text-gray-700 dark:text-white" />
          Anonymous Mode
        </span>
        <div className={`w-10 h-5 flex items-center rounded-full p-1 transition ${settings.anonymous ? "bg-green-500" : "bg-gray-400"}`}>
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${settings.anonymous ? "translate-x-5" : "translate-x-0"}`} />
        </div>
      </div>

      {/* Font Size Selector */}
      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-black transition">
        <span className="flex items-center gap-2 text-gray-800 dark:text-white">
          <FaFont className="text-blue-500" />
          Font Size
        </span>
        <select
          className="bg-gray-200 text-gray-800 p-1 rounded-md cursor-pointer"
          value={settings.fontSize}
          onChange={(e) => updateSetting("fontSize", e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Language Selector */}
      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-black transition">
        <span className="flex items-center gap-2 text-gray-800 dark:text-white">
          <FaGlobe className="text-green-500" />
          Language
        </span>
        <select
          className="bg-gray-200 text-gray-800 p-1 rounded-md cursor-pointer"
          value={settings.language}
          onChange={(e) => updateSetting("language", e.target.value)}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Bengali">Bengali</option>
        </select>
      </div>

      {/* Feedback Button */}
      <Link href="/send-feedback" className="mt-3 text-center text-blue-600 font-semibold hover:underline transition">
        Send Feedback
      </Link>
    </>
  );
};

export default Settings;
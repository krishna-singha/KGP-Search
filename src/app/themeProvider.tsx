"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setTheme } from "@/lib/redux/features/darkMode/darkModeSlice";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.darkMode.theme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    dispatch(setTheme(storedTheme));
  }, [dispatch]);

  return <div className={theme === "dark" ? "dark" : ""}>{children}</div>;
}
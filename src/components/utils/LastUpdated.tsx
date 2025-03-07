"use client";

import { useState, useEffect } from "react";

const LastUpdated = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setLastUpdated(formattedDate);
  }, []);

  return <p className="text-xs opacity-80">Last updated: {lastUpdated}</p>;
};

export default LastUpdated;
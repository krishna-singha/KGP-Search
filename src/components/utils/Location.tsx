"use client";

import { useState, useEffect } from "react";

const Location = () => {
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  const data = async () => {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();
    setCity(data.city);
    setRegion(data.region);
    setCountry(data.country);
  };
  useEffect(() => {
    data();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-[#2b2b2b] rounded-lg shadow-md">
      <p className="text-xs opacity-80">
        <b>Location:</b> {city}, {region}, {country}
      </p>
    </div>
  );
};

export default Location;

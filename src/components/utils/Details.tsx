"use client";

import { useState, useEffect } from "react";

const Details = () => {
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

  return <p className="text-xs opacity-80">Location: {city}, {region}, {country}</p>;
};

export default Details;

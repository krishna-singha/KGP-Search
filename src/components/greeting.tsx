"use client";
import { useState, useEffect } from "react";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Hey, Good morning! ☀️";
  if (hour >= 12 && hour < 17) return "Hey, Good Afternoon 🌤";
  if (hour >= 17 && hour < 21) return "What's up? Good evening! 🌆";

  return "Yo! Good Night 🌙";
};

const Greeting = () => {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-4 text-center">
      <h1 className="text-2xl">{greeting}</h1>
    </div>
  )
};

export default Greeting;

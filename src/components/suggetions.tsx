"use client";

import { useRouter } from "next/navigation";
import { IoMdSearch } from "react-icons/io";

const Suggestions = () => {
  const router = useRouter();

  const handleSearch = async (sugg: string) => {
    router.push(`/search?query=${encodeURIComponent(sugg)}`);
  };

  const suggestions = [
    "IIT Kharagpur",
    "departments",
    "academics",
    "projects",
    "admissions",
    "research",
    "campus",
    "students",
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-3 w-full dark:bg-[#212121] dark:border-[#ffffff33]">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-black transition duration-200"
          onClick={() => handleSearch(suggestion)}
        >
          <IoMdSearch className="text-gray-500 dark:text-white" size={18} />
          <div className="flex-1 overflow-hidden">
            <p className="text-gray-800 text-sm text-ellipsis overflow-hidden whitespace-nowrap dark:text-white">
              {suggestion}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;

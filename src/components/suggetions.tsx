"use client";

import { useRouter } from "next/navigation";
import { IoMdSearch } from "react-icons/io";

const Suggestions = () => {
  const router = useRouter();

  const handleSearch = async (sugg: string) => {
    router.push(`/search?q=${encodeURIComponent(sugg)}`);
  };

  const suggestions = [
    "React",
    "React Native",
    "TypeScript",
    "JavaScript JavaScdefhirhfroript JavaScript JavaScript JavaScript JavaScript JavaScript JavaScrfkrhfirhrigiipt",
    "Node.js",
    "GraphQL",
    "Apollo Client",
  ];

  return (
    <div className="mt-2 bg-white shadow-lg rounded-xl border border-gray-200 p-3 w-full">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={() => handleSearch(suggestion)}
        >
          <IoMdSearch className="text-gray-500" size={18} />
          <div className="flex-1 overflow-hidden">
            <p className="text-gray-800 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
              {suggestion}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;

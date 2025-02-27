"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const options = [
    "All",
    "Halls",
    "Departments",
    "Faculties",
    "Courses",
    "Gymkhana",
    "Exams",
    "Societies",
  ];
  const [selected, setSelected] = useState("All");
  const [showDropdown, setShowDropdown] = useState(true);

  const handleSelect = (option: string) => {
    setSelected(option);
    setShowDropdown(false);
  };

  return (
    <div className="w-full">
      {pathname === "/" ? (
        <div className="flex flex-wrap justify-center mt-6 gap-2">
          {options.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-md transition-colors duration-200 
                ${
                  selected === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-blue-600`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <>
          {showDropdown && (
            <>
              {options.map((option) => (
                <div
                  key={option}
                  className={`px-3 py-2 text-gray-800 cursor-pointer rounded-md transition-colors
                    ${
                      selected === option
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Filter;

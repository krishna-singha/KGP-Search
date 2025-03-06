"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/lib/redux/features/filter/filterSlice";
import { RootState } from "@/lib/redux/store";

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

const Filter = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.filter.value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedFilter = localStorage.getItem("filter") || "All";
    dispatch(setFilter(storedFilter));
  }, [dispatch]);

  if (!mounted) return null;

  const handleSelect = (option: string) => {
    localStorage.setItem("filter", option);
    dispatch(setFilter(option));
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
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        options.map((option) => (
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
        ))
      )}
    </div>
  );
};

export default Filter;
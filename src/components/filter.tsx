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
  const reduxSelected = useSelector((state: RootState) => state.filter.value);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const storedFilter = localStorage.getItem("filter") || "All";
    if (storedFilter !== reduxSelected) {
      dispatch(setFilter(storedFilter));
    }
    setSelected(storedFilter);
  }, [dispatch, reduxSelected]);

  const handleSelect = (option: string) => {
    localStorage.setItem("filter", option);
    dispatch(setFilter(option));
    setSelected(option);
  };

  if (selected === null) return null;

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
                    : "bg-gray-200 text-gray-800 dark:bg-[#212121] dark:text-white"
                }`}
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
            className={`px-3 py-2 text-gray-800 cursor-pointer rounded-md transition-colors dark:text-white
                  ${
                    selected === option
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-black"
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
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { FaGlobeAsia } from "react-icons/fa";

const RESULTS_PER_PAGE = 15;

export type SearchResult = {
  url: string;
  favicon: string;
  title: string;
  content: string;
};

const SearchResults = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTime, setFetchingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!searchQuery) return;
    if(searchQuery.length < 3) return;
    const filterQuery = localStorage.getItem("filter");
    
    const fetchResults = async () => {
      setLoading(true);
      setProgress(0);
      setResults([]);

      const startTime = performance.now();

      intervalRef.current = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 95));
      }, 200);

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/search?query=${searchQuery}`, {filterQuery}
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        clearInterval(intervalRef.current!);
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
        }, 300);

        setFetchingTime((performance.now() - startTime) / 60);
      }
    };

    fetchResults();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [searchQuery]);

  const splitUrl = (url: string) => {
    const urlParts = url.split("/");
    const domain = urlParts[2];
    const path = urlParts.slice(3).join("/");
    return { domain, path };
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + RESULTS_PER_PAGE
  );
  const resTime = fetchingTime.toFixed(2);


  const handleClickCount = async (url: string) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/click", { url });
      router.push(url);
    } catch (error) {
      console.error("Error updating click count:", error);
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {loading && (
        <div
          className="fixed top-20 left-0 h-1 bg-blue-600 transition-all"
          style={{ width: `${progress}%`, zIndex: 1000 }}
        />
      )}

      <p className="text-gray-500 text-sm">
        About {results.length} results ({resTime} seconds)
      </p>
      {results.length === 0 && (
        <div className="flex justify-center items-center heightF">
          <span className="font-bold text-xl">No results found!!</span>
        </div>
      )}

      {paginatedResults.map((result, index) => (
        <div key={index} className="border-b pb-4 flex items-start gap-3">
          <div className="border-2 rounded-full p-1 overflow-hidden flex justify-center items-center">
            <Link href={result.url}>
              {result.favicon.length !== 0 ? (
                <Image
                  src={result.favicon}
                  alt="favicon"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <FaGlobeAsia className="text-[#28282898]" />
              )}
            </Link>
          </div>
          <div>
            <div className="text-gray-500 text-sm flex items-center">
              <p className="inline-block text-black font-semibold">
                {splitUrl(result.url).domain}
              </p>
              {splitUrl(result.url)
                .path.split("/")
                .filter((part) => part.trim() !== "")
                .map((part, i) => (
                  <span key={i} className="text-gray-500">
                    <ChevronRight size={13} className="inline-block ml-1" />
                    {part}
                  </span>
                ))}
            </div>
            <div
              className="text-blue-700 text-lg font-medium hover:underline cursor-pointer"
              onClick={() => handleClickCount(result.url)}
            >
              {result.title}
            </div>
            <div>
              <p className="text-gray-700 text-sm">
                {result.content !== "[]" && result.content}
              </p>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-4 items-center">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

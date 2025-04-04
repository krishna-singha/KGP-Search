"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/lib/redux/hooks";
import debounce from "lodash.debounce";
import SearchBar from "./searchBar";

const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL;

const RESULTS_PER_PAGE = 15;

export type SearchResult = {
  url: string;
  favicon: string;
  title: string;
  content: string;
};

const SearchResultsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const user = useAppSelector((state) => state.user);
  const historyMode = useAppSelector((state) => state.historyMode.enabled);
  const filter = useAppSelector((state) => state.filter.value);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTime, setFetchingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const userId = user?.uid || null;
  const email = user?.email || null;

  // Debounced API call
  const fetchResults = useMemo(
    () =>
      debounce(async (query) => {
        if (!query || query.length < 3) return;
        setLoading(true);
        setProgress(0);
        setResults([]);
        const startTime = performance.now();

        intervalRef.current = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 95));
        }, 200);

        try {
          const response = await axios.post(
            `${FASTAPI_URL}/api/search?query=${encodeURIComponent(
              query
            )}&filter=${filter}`
          );
          setResults(response.data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          clearInterval(intervalRef.current!);
          setProgress(100);
          setTimeout(() => setLoading(false), 300);
          setFetchingTime((performance.now() - startTime) / 1000);
        }
      }, 500),
    [filter]
  );

  useEffect(() => {
    fetchResults(searchQuery);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [searchQuery, fetchResults]);

  const splitUrl = (url: string) => {
    const urlParts = url.split("/");
    return { domain: urlParts[2], path: urlParts.slice(3).join("/") };
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(results.length / RESULTS_PER_PAGE));
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + RESULTS_PER_PAGE
  );
  const resTime = fetchingTime.toFixed(2);

  const handleClickCount = async (url: string) => {
    try {
      await axios.post(`${FASTAPI_URL}/api/click`, { url });

      if (!userId || !email) {
        router.push(url);
        return;
      }

      if (historyMode) {
        await axios.post("/api/history", {
          user_id: userId,
          email: email,
          searchHistory: [
            {
              type: "click",
              query: searchQuery,
              url,
              time: new Date().toISOString(),
            },
          ],
        });
      }

      router.push(url);
    } catch (error) {
      console.error("Error updating click count:", error);
    }
  };

  return (
    <div className="w-full mx-auto space-y-3 md:space-y-6 md:px-6">
      <div className="w-full md:hidden">
        <SearchBar />
      </div>
      {loading && (
        <div
          className="fixed top-20 left-0 h-1 bg-blue-600 transition-all"
          style={{ width: `${progress}%`, zIndex: 1000 }}
        />
      )}
      <p className="text-gray-500 text-sm">
        About {results.length} results ({resTime} seconds)
      </p>
      {results.length === 0 && !loading && (
        <div className="flex justify-center items-center min-h-[20vh]">
          <span className="font-bold text-xl text-gray-700 dark:text-white">
            No results found!
          </span>
        </div>
      )}
      {paginatedResults.map((result, index) => (
        <div
          key={index}
          className={`border-b pb-2 md:pb-4 flex flex-col md:flex-row dark:border-[#ffffff33] md:gap-3`}
        >
          <div className="flex gap-3">
            <div className="border-2 rounded-full overflow-hidden flex justify-center items-center h-[2rem] w-[2rem] dark:border-gray-400 bg-white">
              <div className="w-[1.5rem]">
                <Link
                  href={result.url}
                  className="w-full h-full flex justify-center items-center"
                >
                  <Image
                    src={result.favicon || "/favicon.svg"}
                    alt="favicon"
                    width={16}
                    height={16}
                    unoptimized
                    className="w-full h-full object-cover rounded-full"
                  />
                </Link>
              </div>
            </div>
            <div className="text-black font-semibold dark:text-white flex items-center md:hidden">
              {splitUrl(result.url).domain}
            </div>
          </div>

          <div className="flex flex-col justify-center w-full">
            <div className="text-gray-500 text-xs items-center dark:text-white truncate hidden md:flex">
              <p className="inline-block text-black font-semibold dark:text-white">
                {splitUrl(result.url).domain}
              </p>
              {splitUrl(result.url)
                .path.split("/")
                .filter(Boolean)
                .map((part, i) => (
                  <span key={i} className="text-gray-500 truncate">
                    <ChevronRight size={13} className="inline-block ml-1" />
                    {part}
                  </span>
                ))}
            </div>
            <div
              className="text-blue-700 text-lg font-medium hover:underline cursor-pointer dark:text-blue-400 leading-5 my-2"
              onClick={() => handleClickCount(result.url)}
            >
              {result.title}
            </div>
            <p className="text-gray-700 text-sm dark:text-gray-400">
              {result.content !== "[]" && result.content}
            </p>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-4 items-center">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-sm dark:bg-[#212121] dark:text-white"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-500 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-sm dark:bg-[#212121] dark:text-white"
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

export default function SearchResults() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}

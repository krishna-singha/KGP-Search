"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/lib/redux/hooks";
import debounce from "lodash.debounce";

const RESULTS_PER_PAGE = 15;
const FALLBACK_FAVICON = "https://www.iitkgp.ac.in/assets/img/favicon.png";

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
  const user = useAppSelector((state) => state.user);
  const historyMode = useAppSelector((state) => state.historyMode.enabled);

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
        const filterQuery = localStorage.getItem("filter");

        setLoading(true);
        setProgress(0);
        setResults([]);
        const startTime = performance.now();

        intervalRef.current = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 95));
        }, 200);

        try {
          const response = await axios.post(
            `http://127.0.0.1:8000/api/search?query=${query}`,
            { filterQuery }
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
    []
  );

  useEffect(() => {
    fetchResults(searchQuery);
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [searchQuery, fetchResults]);

  const splitUrl = (url: string) => {
    const urlParts = url.split("/");
    return { domain: urlParts[2], path: urlParts.slice(3).join("/") };
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(results.length / RESULTS_PER_PAGE));
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const paginatedResults = results.slice(startIndex, startIndex + RESULTS_PER_PAGE);
  const resTime = fetchingTime.toFixed(2);

  const handleClickCount = async (url: string) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/click", { url });

      if (!userId || !email) {
        router.push(url);
        return;
      }

      if (historyMode) {
        await axios.post("http://localhost:3000/api/history", {
          user_id: userId,
          email: email,
          searchHistory: [{ type: "click", query: searchQuery, url, time: new Date().toISOString() }],
        });
      }

      router.push(url);
    } catch (error) {
      console.error("Error updating click count:", error);
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {loading && (
        <div className="fixed top-20 left-0 h-1 bg-blue-600 transition-all" style={{ width: `${progress}%`, zIndex: 1000 }} />
      )}
      <p className="text-gray-500 text-sm">
        About {results.length} results ({resTime} seconds)
      </p>
      {results.length === 0 && !loading && (
        <div className="flex justify-center items-center heightF">
          <span className="font-bold text-xl">No results found!!</span>
        </div>
      )}
      {paginatedResults.map((result, index) => (
        <div key={index} className="border-b pb-4 flex gap-3 dark:border-[#ffffff33]">
          <div className="border-2 rounded-full overflow-hidden flex justify-center items-center h-[1.8rem] w-[1.8rem] dark:border-gray-400 bg-white">
            <Link href={result.url} className="w-full h-full flex justify-center items-center">
              <Image
                src={result.favicon || FALLBACK_FAVICON}
                alt="favicon"
                width={16}
                height={16}
                className="w-full h-full object-cover rounded-full"
                unoptimized
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_FAVICON;
                }}
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center w-full">
            <div className="text-gray-500 text-sm flex items-center dark:text-white">
              <p className="inline-block text-black font-semibold dark:text-white">{splitUrl(result.url).domain}</p>
              {splitUrl(result.url).path.split("/").filter(Boolean).map((part, i) => (
                <span key={i} className="text-gray-500">
                  <ChevronRight size={13} className="inline-block ml-1" />
                  {part}
                </span>
              ))}
            </div>
            <div className="text-blue-700 text-lg font-medium hover:underline cursor-pointer dark:text-blue-500" onClick={() => handleClickCount(result.url)}>
              {result.title}
            </div>
            <p className="text-gray-700 text-sm dark:text-gray-400">{result.content !== "[]" && result.content}</p>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-4 items-center">
          <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-[#212121] dark:border-[#ffffff33] dark:text-white"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-500">Page {currentPage} of {totalPages}</span>
          <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-[#212121] dark:border-[#ffffff33] dark:text-white"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

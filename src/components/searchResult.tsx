"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const RESULTS_PER_PAGE = 15;

export type SearchResult = {
  title: string;
  url: string;
  description: string;
  siteName: string;
  favicon?: string;
  extraLinks?: { label: string; href: string }[];
};

export type SearchResultsProps = {
  results: SearchResult[];
};

const results: SearchResult[] = [
  {
    title: "Hello, World! Program",
    url: "https://en.wikipedia.org/wiki/Hello_World_program",
    description:
      'A "Hello, World!" program is a simple program that outputs "Hello, World!" to the screen.',
    siteName: "Wikipedia",
    favicon: "https://www.google.com/s2/favicons?domain=en.wikipedia.org",
    extraLinks: [
      {
        label: "History",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#History",
      },
      {
        label: "Variations",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#Variations",
      },
    ],
  },
  {
    title: "C Hello World Program",
    url: "https://www.geeksforgeeks.org/c-hello-world-program/",
    description:
      'The "Hello World" program is the first step towards learning C programming.',
    siteName: "GeeksforGeeks",
    favicon: "https://www.google.com/s2/favicons?domain=geeksforgeeks.org",
  },
  {
    title: "Hello World in C",
    url: "https://www.programiz.com/c-programming/examples/print-sentence",
    description:
      'In this example, you will learn to print "Hello, World!" on the screen in C programming.',
    siteName: "Programiz",
    favicon: "https://www.google.com/s2/favicons?domain=programiz.com",
  },
  {
    title: "Hello, World! Program",
    url: "https://en.wikipedia.org/wiki/Hello_World_program",
    description:
      'A "Hello, World!" program is a simple program that outputs "Hello, World!" to the screen.',
    siteName: "Wikipedia",
    favicon: "https://www.google.com/s2/favicons?domain=en.wikipedia.org",
    extraLinks: [
      {
        label: "History",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#History",
      },
      {
        label: "Variations",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#Variations",
      },
    ],
  },
  {
    title: "C Hello World Program",
    url: "https://www.geeksforgeeks.org/c-hello-world-program/",
    description:
      'The "Hello World" program is the first step towards learning C programming.',
    siteName: "GeeksforGeeks",
    favicon: "https://www.google.com/s2/favicons?domain=geeksforgeeks.org",
  },
  {
    title: "Hello World in C",
    url: "https://www.programiz.com/c-programming/examples/print-sentence",
    description:
      'In this example, you will learn to print "Hello, World!" on the screen in C programming.',
    siteName: "Programiz",
    favicon: "https://www.google.com/s2/favicons?domain=programiz.com",
  },
  {
    title: "Hello, World! Program",
    url: "https://en.wikipedia.org/wiki/Hello_World_program",
    description:
      'A "Hello, World!" program is a simple program that outputs "Hello, World!" to the screen.',
    siteName: "Wikipedia",
    favicon: "https://www.google.com/s2/favicons?domain=en.wikipedia.org",
    extraLinks: [
      {
        label: "History",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#History",
      },
      {
        label: "Variations",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#Variations",
      },
    ],
  },
  {
    title: "C Hello World Program",
    url: "https://www.geeksforgeeks.org/c-hello-world-program/",
    description:
      'The "Hello World" program is the first step towards learning C programming.',
    siteName: "GeeksforGeeks",
    favicon: "https://www.google.com/s2/favicons?domain=geeksforgeeks.org",
  },
  {
    title: "Hello World in C",
    url: "https://www.programiz.com/c-programming/examples/print-sentence",
    description:
      'In this example, you will learn to print "Hello, World!" on the screen in C programming.',
    siteName: "Programiz",
    favicon: "https://www.google.com/s2/favicons?domain=programiz.com",
  },
  {
    title: "Hello, World! Program",
    url: "https://en.wikipedia.org/wiki/Hello_World_program",
    description:
      'A "Hello, World!" program is a simple program that outputs "Hello, World!" to the screen.',
    siteName: "Wikipedia",
    favicon: "https://www.google.com/s2/favicons?domain=en.wikipedia.org",
    extraLinks: [
      {
        label: "History",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#History",
      },
      {
        label: "Variations",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#Variations",
      },
    ],
  },
  {
    title: "C Hello World Program",
    url: "https://www.geeksforgeeks.org/c-hello-world-program/",
    description:
      'The "Hello World" program is the first step towards learning C programming.',
    siteName: "GeeksforGeeks",
    favicon: "https://www.google.com/s2/favicons?domain=geeksforgeeks.org",
  },
  {
    title: "Hello World in C",
    url: "https://www.programiz.com/c-programming/examples/print-sentence",
    description:
      'In this example, you will learn to print "Hello, World!" on the screen in C programming.',
    siteName: "Programiz",
    favicon: "https://www.google.com/s2/favicons?domain=programiz.com",
  },
  {
    title: "Hello, World! Program",
    url: "https://en.wikipedia.org/wiki/Hello_World_program",
    description:
      'A "Hello, World!" program is a simple program that outputs "Hello, World!" to the screen.',
    siteName: "Wikipedia",
    favicon: "https://www.google.com/s2/favicons?domain=en.wikipedia.org",
    extraLinks: [
      {
        label: "History",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#History",
      },
      {
        label: "Variations",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#Variations",
      },
    ],
  },
  {
    title: "C Hello World Program",
    url: "https://www.geeksforgeeks.org/c-hello-world-program/",
    description:
      'The "Hello World" program is the first step towards learning C programming.',
    siteName: "GeeksforGeeks",
    favicon: "https://www.google.com/s2/favicons?domain=geeksforgeeks.org",
  },
  {
    title: "Hello World in C",
    url: "https://www.programiz.com/c-programming/examples/print-sentence",
    description:
      'In this example, you will learn to print "Hello, World!" on the screen in C programming.',
    siteName: "Programiz",
    favicon: "https://www.google.com/s2/favicons?domain=programiz.com",
  },
  {
    title: "Hello, World! Program",
    url: "https://en.wikipedia.org/wiki/Hello_World_program",
    description:
      'A "Hello, World!" program is a simple program that outputs "Hello, World!" to the screen.',
    siteName: "Wikipedia",
    favicon: "https://www.google.com/s2/favicons?domain=en.wikipedia.org",
    extraLinks: [
      {
        label: "History",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#History",
      },
      {
        label: "Variations",
        href: "https://en.wikipedia.org/wiki/Hello_World_program#Variations",
      },
    ],
  },
  {
    title: "C Hello World Program",
    url: "https://www.geeksforgeeks.org/c-hello-world-program/",
    description:
      'The "Hello World" program is the first step towards learning C programming.',
    siteName: "GeeksforGeeks",
    favicon: "https://www.google.com/s2/favicons?domain=geeksforgeeks.org",
  },
  {
    title: "Hello World in C",
    url: "https://www.programiz.com/c-programming/examples/print-sentence",
    description:
      'In this example, you will learn to print "Hello, World!" on the screen in C programming.',
    siteName: "Programiz",
    favicon: "https://www.google.com/s2/favicons?domain=programiz.com",
  },
];

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + RESULTS_PER_PAGE
  );

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="">
        <p className="text-gray-500 text-sm">
          About {results.length} results (0.69 seconds)
        </p>
      </div>

      {paginatedResults.map((result, index) => (
        <div key={index} className="border-b pb-4 flex items-start gap-3">
          {result.favicon && (
            <div className="border-2 rounded-full p-1 overflow-hidden">
              <Link href={result.url}>
                <Image
                  src={result.favicon}
                  alt="Favicon"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                />
              </Link>
            </div>
          )}
          <div>
            <div className="text-gray-500 text-sm flex items-center">
              <p className="inline-block text-black font-semibold">
                {result.siteName}{" "}
              </p>
              <ChevronRight size={13} className="inline-block ml-1" />
              <Link href={result.url} className="hover:underline">
                {result.url}
              </Link>
            </div>
            <Link
              href={result.url}
              className="text-blue-700 text-lg font-medium hover:underline"
            >
              {result.title}
            </Link>
            <p className="text-gray-700 text-sm mt-1">{result.description}</p>
            {result.extraLinks && (
              <div className="mt-2 flex flex-wrap gap-2">
                {result.extraLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-4 items-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;

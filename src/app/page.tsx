import SearchBar from "@/components/searchBar";
import Greeting from "@/components/greeting";
import Filter from "@/components/filter";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 sm:px-6 md:px-8 text-gray-900 dark:text-[#bfbfbf]">
      {/* Hero Section */}
      <section className="w-full max-w-2xl mt-16 sm:mt-20 text-center">
        <Greeting />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Discover Anything, Instantly
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2 dark:text-[#bfbfbf] mb-4">
          🔍 The Fastest Way to Explore{" "}
          <span className="text-blue-500 font-semibold">IIT KGP</span>
        </p>
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <SearchBar />
          <Filter />
        </div>
      </section>
    </main>
  );
}

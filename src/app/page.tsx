import SearchBar from "@/components/searchBar";
import Greeting from "@/components/greeting";
import Suggestions from "@/components/suggetions";
import Filter from "@/components/filter";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 text-gray-900 dark:text-[#bfbfbf]">
      {/* Hero Section */}
      <section className="w-full max-w-2xl mt-20 text-center">
        <Greeting />
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Discover Anything, Instantly
        </h1>
        <p className="text-lg text-gray-600 mt-2 dark:text-[#bfbfbf] mb-4">
          🔍 The Fastest Way to Explore{" "}
          <span className="text-blue-500 font-semibold">IIT KGP</span>
        </p>
        <SearchBar />
        <Filter />
      </section>

      {/* Suggestions Section
      <section className="mt-8 w-full max-w-2xl flex justify-center">
        <Suggestions />
      </section> */}
    </main>
  );
}

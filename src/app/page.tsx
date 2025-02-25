import SearchBar from "../components/searchBar";
import Greeting from "@/components/greeting";
import Suggestions from "@/components/suggetions";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-6 text-gray-900">
      {/* Container with Max Width */}
      <div className="w-full max-w-2xl mt-32 text-center">
        <Greeting />

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Discover Anything, Instantly
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            🔍 The Fastest Way to Explore{" "}
            <span className="text-blue-500 font-semibold">IIT KGP</span>
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar />
      </div>

      {/* Suggestions Section */}
      <div className="mt-8 w-full max-w-2xl flex justify-center">
        <Suggestions />
      </div>
    </div>
  );
}

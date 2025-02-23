import SearchBar from "../components/searchBar";
import Greeting from "@/components/greeting";
import Suggestions from "@/components/suggetions";

export default function Home() {
  return (
    <main className="p-6 heightF flex flex-col items-center max-w-[1200px] mx-auto">
      <div className="w-1/2 mt-40">
        <Greeting />
        <SearchBar />
      </div>
      <Suggestions />
    </main>
  );
}

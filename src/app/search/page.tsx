import SearchResults from "@/components/searchResult";

const SearchPage = () => {
  
  return (
    <div className="max-w-[1200px] mx-auto w-full">
      <SearchResults />
    </div>
  );
};

export default SearchPage;

// "use client";
// import { useState } from "react";
// import { Input } from "@/components/Input";
// import { Button } from "@/components/Button";
// import { Card, CardContent } from "@/components/Card";
// import { Search, UserCircle, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// const results = [
//   { title: "Department of Computer Science", link: "https://cse.iitkgp.ac.in", description: "Official page of the Computer Science department at IIT KGP." },
//   { title: "Hall of Residence - Nehru Hall", link: "https://halls.iitkgp.ac.in", description: "Accommodation details and facilities at Nehru Hall of Residence." },
//   { title: "Gymkhana Activities", link: "https://gymkhana.iitkgp.ac.in", description: "Explore student activities, clubs, and events organized by Gymkhana." }
// ];

// export default function SearchResultsPage() {
//   const [query, setQuery] = useState("");

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-gray-200">
//       <header className="flex justify-between w-full max-w-4xl p-4">
//         <h1 className="text-2xl font-bold text-white">KGP Search X</h1>
//       </header>
//       <Card className="w-full max-w-xl shadow-lg rounded-2xl mt-4 bg-gray-800 border-gray-700">
//         <CardContent className="p-4 flex items-center gap-2">
//           <Search className="text-gray-400" />
//           <Input type="text" placeholder="Search the web..." className="border-none shadow-none focus:ring-0 bg-gray-700 text-gray-200 placeholder-gray-400" value={query} onChange={(e) => setQuery(e.target.value)} />
//           <Button variant="default" className="bg-blue-600 hover:bg-blue-500 text-white">Search</Button>
//         </CardContent>
//       </Card>
//       <div className="mt-6 w-full max-w-2xl">
//         {results.map((result, index) => (
//           <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
//             <Card className="mb-4 shadow-md hover:shadow-lg transition rounded-xl bg-gray-800 border-gray-700">
//               <CardContent className="p-4">
//                 <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-400 hover:text-blue-300 hover:underline">
//                   {result.title} <ArrowRight className="inline-block w-5 h-5 text-blue-400" />
//                 </a>
//                 <p className="text-gray-400 mt-1">{result.description}</p>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

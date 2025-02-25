"use client";

import { useRouter } from "next/navigation";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-gray-900">
      <TbError404 className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold">Oops! Page Not Found</h1>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

import { IoMdSearch } from "react-icons/io";

const suggetions = [
  "React",
  "React Native React Native React Native React Native React Native React Native React Native React Native",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "GraphQL",
  "Apollo Client",
];

const Suggestions = () => {
  
  return (
    <div className=" mt-6 w-1/2 border-gray-300 rounded-xl p-3 bg-white shadow-md">
      {suggetions.map((suggestion, index) => (
        <div
          key={index}
          className="hover:bg-gray-200 flex items-center px-1 py-[0.4rem] rounded-md cursor-pointer"
        >
          <div>
            <IoMdSearch className="mr-1" />
          </div>
          <div>
            <p className="text-lg text-[0.9rem] leading-[1.2rem]">
              {suggestion}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;

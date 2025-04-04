import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import LastUpdated from "./utils/LastUpdated";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r  py-10 border-t dark:border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        
        {/* Left Section - About */}
        <div className="text-center md:text-left space-y-2">
          <p className="text-xs text-gray-700 dark:text-gray-400">
            🚀 IIT KGP Search Engine
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            As our database expands, search results will continuously improve.
          </p>
          <LastUpdated />
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5 mt-6 md:mt-0">
          <Link href="https://www.instagram.com/krishna___singha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-2xl text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-all transform hover:scale-110" />
          </Link>
          <Link href="https://github.com/krishna-singha/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-2xl text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all transform hover:scale-110" />
          </Link>
          <Link href="https://linkedin.com/in/krishnasingha/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-all transform hover:scale-110" />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 md:mt-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 &nbsp;
            <Link href="https://krishnasingha.wiki" className="text-blue-600 hover:underline transition">
              Krishna Singha
            </Link>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

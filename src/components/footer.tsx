import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import LastUpdated from "./utils/LastUpdated";
import Details from "./utils/Details";

const Footer = () => {
  const navigation = [
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <footer className="bg-white py-8 border-t dark:bg-[#0f0f0f] dark:text-white dark:border-[#ffffff33]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="text-center md:text-left">
          <p className="text-xs opacity-80">
            © 2025 &nbsp;
            <Link
              href="https://krishnasingha.wiki"
              className="text-blue-600 hover:underline transition duration-300"
            >
              Krishna Singha
            </Link>
            . All rights reserved.
          </p>
          <LastUpdated />
          <Details />
        </div>

        <div className="flex flex-wrap justify-center md:justify-end space-x-6 mt-4 md:mt-0">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-black transition duration-300 dark:text-gray-500 dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="https://github.com/krishna___singha/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-xl hover:text-blue-600 hover:scale-125 transition duration-300" />
          </Link>
          <Link
            href="https://github.com/krishna-singha/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl hover:text-blue-600 hover:scale-125 transition duration-300" />
          </Link>
          <Link
            href="https://linkedin.com/in/krishnasingha/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-xl hover:text-blue-600 hover:scale-125 transition duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

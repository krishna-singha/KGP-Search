import Link from "next/link";

const Footer = () => {
  const navigation = [
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <footer className="bg-white border-t py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        {/* Left: Copyright */}
        <div className="text-center md:text-left">
          <p>© 2025 Krishna Singha. All rights reserved.</p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end space-x-6 mt-4 md:mt-0">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-gray-900 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

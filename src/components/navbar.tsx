import Link from "next/link";
import StylishButton from "./stylishBtn";

const Navbar = () => {
  const navigation = [
    { name: "About", href: "/about" },
    { name: "History", href: "/history" },
    { name: "Anonymous", href: "/anonymous" },
    { name: "ChatBot", href: "/chatbot" },
  ];

  return (
    <nav className="bg-white border-b sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold">navX</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/login">
              <StylishButton variant="primary">Login</StylishButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

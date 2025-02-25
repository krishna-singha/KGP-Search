import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChatBotBtn from "@/components/chatBotBtn";
import StoreProvider from "@/store/storeProvider";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KGP Search",
  description: "This is a search engine for IIT KGP students and faculty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 text-gray-900 flex flex-col`}
        >
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 min-h-screen max-w-7xl mx-auto w-full px-6 py-10">
            {children}
            <ChatBotBtn />
          </main>

          {/* Footer */}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}

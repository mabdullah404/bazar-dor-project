import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

// গুগল বাংলা ফন্ট Hind Siliguri কনফিগারেশন
const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata = {
  title: "বাজার দর — আজকের বাজারের দাম",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর দেখুন।",
};

export const instant = false;


export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="bn"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f7f5] text-gray-900 font-sans">
        {/* সব পেজে ন্যাভবার */}
        <Navbar />

        {/* সব পেজে মারকুই লাইভ প্রাইস টিকার */}
        <Suspense fallback={null}>
          <Marquee />
        </Suspense>

        {/* মূল পেজ কনটেন্ট */}
        <div className="flex-1">{children}</div>

        {/* সব পেজে ফুটার */}
        <Footer />

        {/* টোস্ট নোটিফিকেশন কনটেইনার */}
        <ToastContainer position="top-center" autoClose={3000} limit={3} />
      </body>
    </html>
  );
}



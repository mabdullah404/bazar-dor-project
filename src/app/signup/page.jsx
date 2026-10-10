import Link from "next/link";
import Marquee from "../components/Marquee";
import SignupForm from "./signup-form";

export const metadata = {
  title: "সাইন আপ | বাজার দর",
  description: "বাজার দর-এ আপনার অ্যাকাউন্ট তৈরি করুন।",
};

export default function SignupPage() {
  return (
    <>
      <Marquee />

      <main className="flex flex-1 flex-col items-center justify-center bg-[#f4f7f5] px-4 py-12 sm:py-16">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              বাজারের দর ও পছন্দের পণ্য সহজে দেখতে যোগ দিন।
            </p>
          </div>

          <SignupForm />

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-[#059669] hover:text-[#047857]">
              সাইন ইন করুন
            </Link>
          </p>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-medium text-[#059669] hover:text-[#047857]">
              ← বাজার দর-এ ফিরে যান
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white px-4 py-5 text-center text-xs text-gray-500 sm:flex sm:justify-between sm:px-8 sm:text-left">
        <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        <span className="mt-2 sm:mt-0">সঠিক বাজার তথ্য, সচেতন কেনাকাটা।</span>
      </footer>
    </>
  );
}

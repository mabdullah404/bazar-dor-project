import Link from "next/link";
import SignupForm from "./signup-form";

export const metadata = {
  title: "সাইন আপ | বাজার দর",
  description: "বাজার দর-এ আপনার অ্যাকাউন্ট তৈরি করুন।",
};

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-md">
        {/* হেডার টেক্সট */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-500 font-medium">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* সাইন আপ ফর্ম ও সোশ্যাল বাটন */}
        <SignupForm />

        {/* হোম পেজে ফিরে যাওয়ার লিঙ্ক */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}



"use client";

import Link from "next/link";
import Image from "next/image";

// ফুটার কম্পোনেন্ট — পেজের একদম নিচের অংশ
// প্রজেক্টের সবুজ কালার থিম মেনে ডিজাইন করা হয়েছে
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">

      {/* মূল ফুটার কনটেন্ট — তিন কলামে ভাগ করা */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* কলাম ১: লোগো ও সাইটের পরিচিতি */}
          <div className="space-y-4">

            {/* লোগো — নেভবারের মতো একই স্টাইল রাখা হয়েছে */}
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="bg-[#059669] w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <Image
                  src="/logo-icon.png"
                  alt="বাজার দর লোগো"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-gray-900">বাজার দর।</span>
            </Link>

            {/* সাইটের সংক্ষিপ্ত বিবরণ — Figma অনুযায়ী */}
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* কলাম ২: সাইটের গুরুত্বপূর্ণ পেজগুলোর লিংক */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              প্রয়োজনীয় লিংক
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#059669] transition-colors"
                >
                  <span className="text-base">🏠</span>
                  হোম
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#059669] transition-colors"
                >
                  <span className="text-base">🛒</span>
                  সব পণ্য
                </Link>
              </li>

              <li>
                <Link
                  href="/products?sort=price_change"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#059669] transition-colors"
                >
                  <span className="text-base">📈</span>
                  আজকের বাজারদর
                </Link>
              </li>
            </ul>
          </div>

          {/* কলাম ৩: দাম সম্পর্কে নোটিশ (Figma অনুযায়ী) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              দাম সম্পর্কে নোটিশ
            </h3>

            {/* Figma-required disclaimer text */}
            <p className="text-sm text-gray-500 leading-relaxed">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>

            {/* GitHub প্রফাইল বাটন */}
            <a
              href="https://github.com/mabdullah404"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gray-50 hover:bg-[#e8f5e9] border border-gray-200 hover:border-[#059669]/40 text-gray-700 hover:text-[#059669] text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>Find me on GitHub</span>
              <span className="text-xs text-gray-400">↗</span>
            </a>
          </div>

        </div>
      </div>

      {/* একদম নিচের কপিরাইট বার */}
      <div className="border-t border-gray-100 bg-gray-50/70 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © {currentYear} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

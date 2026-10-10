"use client";

import { useState } from "react";
import Link from "next/link";
import SocialAuth from "../components/SocialAuth";

export default function SigninForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      "সাইন ইন সেবা এখনো চালু হয়নি। অ্যাকাউন্টে প্রবেশের API যুক্ত হলে সাইন ইন করা যাবে।"
    );
  }

  const inputClassName =
    "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs"
    >
      <div>
        <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-gray-700">
          ইমেইল
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-xs sm:text-sm font-semibold text-gray-700"
        >
          পাসওয়ার্ড
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          minLength={8}
          className={inputClassName}
          required
        />
      </div>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className="rounded-xl bg-amber-50 px-3.5 py-3 text-xs sm:text-sm leading-6 text-amber-800"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-[#059669] px-4 py-3 font-semibold text-sm sm:text-base text-white shadow-xs transition hover:bg-[#047857] cursor-pointer"
      >
        সাইন ইন
      </button>

      {/* আলাদা সোশ্যাল অথ কম্পোনেন্ট */}
      <SocialAuth />

      {/* কার্ডের ভিতরের নিচের লিঙ্ক */}
      <p className="mt-4 pt-2 text-center text-xs sm:text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#059669] hover:text-[#047857]"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}


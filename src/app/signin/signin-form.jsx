"use client";

import { useState } from "react";

export default function SigninForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      "সাইন ইন সেবা এখনো চালু হয়নি। অ্যাকাউন্টে প্রবেশের API যুক্ত হলে সাইন ইন করা যাবে।"
    );
  }

  const inputClassName =
    "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
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
          className="text-sm font-semibold text-gray-700"
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
          className="rounded-xl bg-amber-50 px-3.5 py-3 text-sm leading-6 text-amber-800"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-[#059669] px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-[#047857] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669]"
      >
        সাইন ইন
      </button>
    </form>
  );
}

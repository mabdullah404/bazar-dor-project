"use client";

import { useState } from "react";

export default function SignupForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setMessage("দুটি পাসওয়ার্ড মিলছে না। আবার পরীক্ষা করুন।");
      return;
    }

    setMessage(
      "রেজিস্ট্রেশন সেবা এখনো চালু হয়নি। অ্যাকাউন্ট তৈরির API যুক্ত হলে সাইন আপ করা যাবে।"
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
        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
          নাম
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="যেমন: রহিম উদ্দিন"
          className={inputClassName}
          required
        />
      </div>

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
          autoComplete="new-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          minLength={8}
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="text-sm font-semibold text-gray-700"
        >
          পাসওয়ার্ড নিশ্চিত করুন
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="আবার লিখুন"
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
        অ্যাকাউন্ট তৈরি করুন
      </button>
    </form>
  );
}

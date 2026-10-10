"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SocialAuth from "../components/SocialAuth";

export default function SignupForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setMessage("দুটি পাসওয়ার্ড মিলছে না। আবার পরীক্ষা করুন।");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setMessage(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
        setLoading(false);
        return;
      }

      // সফল হলে হোম পেজে রিডাইরেক্ট হবে
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign up error:", err);
      setMessage("অ্যাকাউন্ট তৈরিতে ত্রুটি হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  }

  const inputClassName =
    "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs"
    >
      <div>
        <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-gray-700">
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
          className="text-xs sm:text-sm font-semibold text-gray-700"
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
          className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-3 text-xs sm:text-sm leading-6 text-red-700"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#059669] px-4 py-3 font-semibold text-sm sm:text-base text-white shadow-xs transition hover:bg-[#047857] cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-xs"></span>
            অ্যাকাউন্ট তৈরি হচ্ছে...
          </>
        ) : (
          "অ্যাকাউন্ট তৈরি করুন"
        )}
      </button>

      {/* আলাদা সোশ্যাল অথ কম্পোনেন্ট */}
      <SocialAuth />

      {/* কার্ডের ভিতরের নিচের লিঙ্ক */}
      <p className="mt-4 pt-2 text-center text-xs sm:text-sm text-gray-600">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-[#059669] hover:text-[#047857]"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}



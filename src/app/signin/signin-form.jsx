"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import SocialAuth from "../components/SocialAuth";

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // প্রোটেক্টেড রাউট থেকে রিডাইরেক্ট হয়ে আসলে টোস্ট দেখানো (যাতে ডুপ্লিকেট না হয় তাই toastId ব্যবহার করা হয়েছে)
  useEffect(() => {
    if (searchParams.get("auth_required") === "true") {
      if (!toast.isActive("auth-required-toast")) {
        toast.warn("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন!", {
          toastId: "auth-required-toast",
        });
      }
    }
  }, [searchParams]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        const errorText = error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
        setMessage(errorText);
        toast.error(errorText);
        setLoading(false);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      const redirectUrl = searchParams.get("redirect") || "/";
      router.push(redirectUrl);
      router.refresh();
    } catch (err) {
      console.error("Sign in error:", err);
      const errText = "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setMessage(errText);
      toast.error(errText);
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
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            minLength={8}
            className={`${inputClassName} pr-16`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-[#059669] cursor-pointer select-none transition-colors"
          >
            {showPassword ? "লুকান" : "দেখুন"}
          </button>
        </div>
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
            সাইন ইন হচ্ছে...
          </>
        ) : (
          "সাইন ইন"
        )}
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

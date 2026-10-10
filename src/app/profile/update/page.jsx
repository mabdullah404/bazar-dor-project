"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

// ====================================================================
// প্রোফাইল তথ্য আপডেট সাবরুট (/profile/update)
// ====================================================================
export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // ইনপুটের জন্য স্টেট
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ইউজার ডাটা আসলে ইনপুটে নাম সেট করা
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // প্রোফাইল তথ্য আপডেট ফাংশন
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);

    try {
      // Better Auth updateUser API কল করা
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করতে ব্যর্থ হয়েছে।");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
        // আপডেট হওয়ার পর মূল প্রোফাইল পেজে ফিরে যাওয়া
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  // ১. লোডিং অবস্থা
  if (isPending) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-[#059669]"></span>
          <p className="text-sm text-gray-500 font-medium">লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  // ২. ইউজার লগইন না থাকলে সাইন ইন পেজে যাওয়ার প্রম্পট
  if (!user) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center text-3xl mx-auto mb-4">
            🔒
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            সাইন ইন প্রয়োজন
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            তথ্য আপডেট করতে অনুগ্রহ করে আগে সাইন ইন করুন।
          </p>
          <Link
            href="/signin?redirect=/profile/update"
            className="inline-block w-full bg-[#059669] hover:bg-[#047857] text-white font-semibold py-2.5 rounded-xl transition shadow-xs"
          >
            সাইন ইন পেজে যান
          </Link>
        </div>
      </main>
    );
  }

  // ৩. আপডেট ফর্ম
  return (
    <main className="min-h-[75vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* ব্যাক বাটন */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#059669] transition"
        >
          <span>←</span>
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>

        {/* হেডার */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
          </p>
        </div>

        {/* সিঙ্গেল ইনপুট ফর্ম */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label
                htmlFor="user-name"
                className="text-xs sm:text-sm font-semibold text-gray-700 block mb-1.5"
              >
                নাম (Name)
              </label>
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            {/* আপডেট বাটন */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold py-2.5 sm:py-3 text-sm transition shadow-xs cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  আপডেট হচ্ছে...
                </>
              ) : (
                "Update Information (তথ্য আপডেট করুন)"
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}

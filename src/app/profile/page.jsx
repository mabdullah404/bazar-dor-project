"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // নাম আপডেট হ্যান্ডলার
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setStatusMessage({ text: "", type: "" });

    try {
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        setStatusMessage({
          text: error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।",
          type: "error",
        });
      } else {
        setStatusMessage({
          text: "আপনার নাম সফলভাবে আপডেট করা হয়েছে!",
          type: "success",
        });
        router.refresh();
      }
    } catch (err) {
      console.error("Update error:", err);
      setStatusMessage({
        text: "নাম আপডেট করতে সমস্যা হয়েছে।",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // লোডিং স্টেট
  if (isPending) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-[#059669]"></span>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            প্রোফাইল লোড হচ্ছে...
          </p>
        </div>
      </main>
    );
  }

  // যদি ইউজার লগইন না থাকে
  if (!user) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white border border-gray-200/90 rounded-3xl p-8 max-w-md w-full text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center text-3xl mx-auto mb-4">
            🔒
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            প্রোফাইল দেখতে সাইন ইন করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            আপনার অ্যাকাউন্টের তথ্য দেখতে ও পরিচালনা করতে প্রথমে সাইন ইন করুন।
          </p>
          <Link
            href="/signin"
            className="inline-block w-full bg-[#059669] hover:bg-[#047857] text-white font-semibold py-2.5 rounded-xl transition shadow-xs"
          >
            সাইন ইন পেজে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* ================= পেজ হেডার ================= */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* ================= কার্ড ১: ইউজার তথ্য ও সাইন আউট ================= */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* অ্যাভাটার */}
            <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-[#059669]">
                  {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
                </span>
              )}
            </div>

            {/* নাম ও ইমেইল */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          {/* সাইন আউট বাটন */}
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 bg-red-50/80 hover:bg-red-100 border border-red-200 px-3.5 py-2 rounded-xl transition cursor-pointer shadow-2xs shrink-0"
          >
            <span>↪</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* ================= কার্ড ২: তথ্য এডিট ফর্ম ================= */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label
                htmlFor="profile-name"
                className="text-xs sm:text-sm font-semibold text-gray-700 block mb-1.5"
              >
                নাম
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            {/* স্ট্যাটাস নোটিফিকেশন */}
            {statusMessage.text && (
              <p
                className={`text-xs sm:text-sm p-3 rounded-xl border ${
                  statusMessage.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-[#059669]"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
              >
                {statusMessage.text}
              </p>
            )}

            {/* আপডেট বাটন */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold py-2.5 sm:py-3 text-sm transition shadow-xs cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  আপডেট হচ্ছে...
                </>
              ) : (
                "আপডেট"
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}

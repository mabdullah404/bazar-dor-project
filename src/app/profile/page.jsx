"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

// ====================================================================
// প্রোফাইল পেজ কম্পোনেন্ট (/profile)
// ব্যবহারকারীর তথ্য প্রদর্শন এবং আপডেট পেজের লিংক
// ====================================================================
export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // সাইন আউট ফাংশন
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.info("সফলভাবে সাইন আউট হয়েছেন!");
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  // ১. সেশন লোড হওয়ার সময় লোডিং স্পিনার
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

  // ২. ইউজার যদি লগইন না থাকে
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
            href="/signin?redirect=/profile"
            className="inline-block w-full bg-[#059669] hover:bg-[#047857] text-white font-semibold py-2.5 rounded-xl transition shadow-xs"
          >
            সাইন ইন পেজে যান
          </Link>
        </div>
      </main>
    );
  }

  // ৩. মূল প্রোফাইল ইন্টারফেস
  return (
    <main className="min-h-[75vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* পেজ টাইটেল */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখতে পাবেন।
          </p>
        </div>

        {/* প্রোফাইল তথ্য কার্ড */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          
          {/* ইউজার অ্যাভাটার ও নাম */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-[#059669]">
                    {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
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
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl transition cursor-pointer shadow-2xs self-start sm:self-center"
            >
              <span>↪</span>
              <span>সাইন আউট</span>
            </button>
          </div>

          {/* বিস্তারিত বিবরণী */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-50 text-sm">
              <span className="text-gray-500">নাম</span>
              <span className="font-semibold text-gray-900">{user.name || "প্রদান করা হয়নি"}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50 text-sm">
              <span className="text-gray-500">ইমেইল</span>
              <span className="font-semibold text-gray-900">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50 text-sm">
              <span className="text-gray-500">স্ট্যাটাস</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#059669] border border-emerald-200">
                সক্রিয় (Active)
              </span>
            </div>
          </div>

          {/* আপডেট তথ্য বাটন (চ্যালেঞ্জ ৩ অনুযায়ী আলাদা রুটে যাওয়ার বাটন) */}
          <div className="pt-2">
            <Link
              href="/profile/update"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold py-3 text-sm transition shadow-xs cursor-pointer"
            >
              <span>✏️</span>
              <span>তথ্য আপডেট করুন (Update Profile)</span>
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}

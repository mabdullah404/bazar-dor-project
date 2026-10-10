"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsOpen(false);
      await authClient.signOut();
      toast.info("সফলভাবে সাইন আউট হয়েছেন!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // লোডিং স্টেট
  if (isPending) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="w-16 h-8 bg-gray-100 rounded-lg"></div>
        <div className="w-20 h-9 bg-gray-100 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {user ? (
        /* ইউজার লগইন অবস্থায় ড্রপডাউন মেনু */
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-2xl transition cursor-pointer border border-transparent hover:border-gray-200"
          >
            {/* অ্যাভাটার */}
            <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-[#059669]">
                  {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
                </span>
              )}
            </div>

            {/* ইউজারের নাম এবং ড্রপডাউন অ্যারো */}
            <span className="text-xs sm:text-sm font-bold text-gray-800 max-w-[120px] truncate">
              {user.name ? user.name.split(" ")[0] : "প্রোফাইল"}
            </span>
            <span className="text-xs text-gray-400">▾</span>
          </button>

          {/* ড্রপডাউন মেনু */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-gray-100 shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  {user.email}
                </p>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#059669] transition"
              >
                <span>👤</span>
                <span>আমার প্রোফাইল</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer text-left"
              >
                <span>↪</span>
                <span>সাইন আউট</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ইউজার লগআউট অবস্থায় থাকলে সাইন ইন ও সাইন আপ বাটন */
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="text-gray-800 hover:text-[#059669] text-xs sm:text-sm px-3 py-2 transition-colors font-bold"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

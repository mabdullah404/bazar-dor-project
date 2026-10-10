import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialAuth() {
  return (
    <div className="space-y-4 pt-1">
      {/* অথবা ডিভাইডার */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-gray-200"></div>
        <span className="absolute bg-white px-3 text-xs text-gray-500 font-medium">
          অথবা
        </span>
      </div>

      {/* গুগল ও গিটহাব বাটন */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* গুগল বাটন */}
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-700 transition cursor-pointer"
        >
          <FcGoogle className="text-lg shrink-0" />
          <span>Google দিয়ে চালিয়ে যান</span>
        </button>

        {/* গিটহাব বাটন */}
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-700 transition cursor-pointer"
        >
          <FaGithub className="text-lg text-gray-900 shrink-0" />
          <span>GitHub দিয়ে চালিয়ে যান</span>
        </button>
      </div>
    </div>
  );
}

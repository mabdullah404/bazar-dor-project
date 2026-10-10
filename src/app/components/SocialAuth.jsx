"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SocialAuth() {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    try {
      setLoadingProvider(provider);
      await authClient.signIn.social({
        provider: provider,
        callbackURL: "/",
      });
    } catch (error) {
      console.error(`${provider} Login error:`, error);
      setLoadingProvider(null);
    }
  };

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
          onClick={() => handleSocialLogin("google")}
          disabled={loadingProvider !== null}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-700 transition cursor-pointer disabled:opacity-60"
        >
          <FcGoogle className="text-lg shrink-0" />
          <span>{loadingProvider === "google" ? "লোড হচ্ছে..." : "Google দিয়ে চালিয়ে যান"}</span>
        </button>

        {/* গিটহাব বাটন */}
        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          disabled={loadingProvider !== null}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-700 transition cursor-pointer disabled:opacity-60"
        >
          <FaGithub className="text-lg text-gray-900 shrink-0" />
          <span>{loadingProvider === "github" ? "লোড হচ্ছে..." : "GitHub দিয়ে চালিয়ে যান"}</span>
        </button>
      </div>
    </div>
  );
}


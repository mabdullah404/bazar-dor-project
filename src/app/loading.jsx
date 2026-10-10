import React from "react";

// ====================================================================
// গ্লোবাল লোডিং পেইজ (Global Loading Page)
// ====================================================================
export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm max-w-md w-full flex flex-col items-center text-center">
        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30"></div>

          <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-[#059669] animate-spin"></div>

          <span className="absolute text-2xl select-none">🧺</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          বাজার দর লোড হচ্ছে...
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          অনুগ্রহ করে একটু অপেক্ষা করুন, সর্বশেষ পণ্যের দাম সংগ্রহ করা হচ্ছে।
        </p>

        <div className="w-full space-y-2.5">
          <div className="h-2.5 bg-gray-100 rounded-full w-full animate-pulse"></div>
          <div className="h-2.5 bg-gray-100 rounded-full w-4/5 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

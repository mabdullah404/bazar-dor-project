import React, { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import SigninForm from "./signin-form";

export const metadata = {
  title: "সাইন ইন | বাজার দর",
  description: "বাজার দর-এ আপনার অ্যাকাউন্টে সাইন ইন করুন।",
};

export const instant = false;

export default async function SigninPage() {
  await connection();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-md">
        {/* হেডার টেক্সট */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            সাইন ইন
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-500 font-medium">
            আপনার অ্যাকাউন্টে প্রবেশ করতে ইমেইল ও পাসওয়ার্ড দিন।
          </p>
        </div>

        {/* সাইন ইন ফর্ম ও সোশ্যাল বাটন */}
        <Suspense fallback={<div className="h-48 flex items-center justify-center text-sm text-gray-400">লোড হচ্ছে...</div>}>
          <SigninForm />
        </Suspense>

        {/* হোম পেজে ফিরে যাওয়ার লিঙ্ক */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}



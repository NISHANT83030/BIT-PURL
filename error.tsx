"use client";
import React from "react";
import Link from "next/link";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white/10 border border-white/20 rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 max-w-md w-full">
        <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" fill="#ef4444" opacity="0.15" />
          <path d="M24 24l16 16M40 24l-16 16" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="text-3xl font-bold text-white text-center">Something went wrong</h1>
        <p className="text-white/70 text-center">
          {error?.message || "An unexpected error has occurred. Please try again later."}
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-white font-semibold shadow hover:scale-105 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#00D1FF] text-white font-semibold shadow hover:scale-105 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
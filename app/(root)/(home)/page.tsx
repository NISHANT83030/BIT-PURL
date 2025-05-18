import React from 'react';
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center w-full b px-4 py-12">
      {/* Hero Section */}
        
      <section className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 py-16 px-6 rounded-3xl bg-white/5 backdrop-blur-md shadow-xl border border-white/10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] bg-clip-text text-transparent drop-shadow-lg">
          Shorten, Share & Track <br /> Your <span className="underline decoration-[#00D1FF]/60">Links</span> Instantly
        </h1>
        <p className="text-lg sm:text-xl text-center text-white/80 max-w-2xl">
          BitPurl makes it effortless to create beautiful, branded short links. Analyze clicks, manage your URLs, and boost your online presence—all in one place.
        </p>
        <Link
          href="/shorten"
          className="inline-block px-8 py-3 rounded-lg text-white bg-[#0E78F9] font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
        >
          Try Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="flex flex-col items-center bg-white/5 rounded-2xl p-6 shadow-lg border border-white/10">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <path d="M7 14.5L9 12.5M9 12.5C9.82843 11.6716 11.1716 11.6716 12 12.5M9 12.5L7 10.5" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M17 9.5L15 11.5M15 11.5C14.1716 12.3284 12.8284 12.3284 12 11.5M15 11.5L17 13.5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 11L12 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <h3 className="mt-4 text-xl font-bold text-white">Instant Shortening</h3>
          <p className="text-white/70 text-center mt-2">Create short, memorable links in seconds with a single click.</p>
        </div>
        <div className="flex flex-col items-center bg-white/5 rounded-2xl p-6 shadow-lg border border-white/10">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#00D1FF" strokeWidth="1.5"/>
            <path d="M8 12l2 2 4-4" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="mt-4 text-xl font-bold text-white">Analytics & Tracking</h3>
          <p className="text-white/70 text-center mt-2">Monitor clicks, locations, and engagement with real-time analytics.</p>
        </div>
        <div className="flex flex-col items-center bg-white/5 rounded-2xl p-6 shadow-lg border border-white/10">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="4" stroke="#7C3AED" strokeWidth="1.5"/>
            <path d="M8 12h8M12 8v8" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <h3 className="mt-4 text-xl font-bold text-white">Easy Management</h3>
          <p className="text-white/70 text-center mt-2">Organize, edit, and customize your links with a beautiful dashboard.</p>
        </div>
      </section>
    </main>
  );
}
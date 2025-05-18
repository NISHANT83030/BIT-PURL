import dbConnect from '@/lib/db';
import Url from '@/lib/url';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({ params }: any) => {
  const shorturl = params.shorturl;
  await dbConnect();
  const urlObject = await Url.findOne({ shorturl });

  if (!urlObject) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1C1F2E] via-[#23243a] to-[#2e225a] px-4">
        <div className="bg-white/10 border border-white/20 rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 max-w-md w-full">
          <svg width="60" height="60" fill="none" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="28" fill="#ef4444" opacity="0.12"/>
            <path d="M22 22l16 16M38 22l-16 16" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="text-2xl font-bold text-white text-center">This URL no longer exists</h1>
          <p className="text-white/70 text-center">
            The link you are trying to access has either expired, been deleted, or never existed.
          </p>
          
          <Link
            href="/"
            className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-white font-semibold shadow hover:scale-105 transition"
          >
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  urlObject.clicksByDate.set(
    today,
    (urlObject.clicksByDate.get(today) || 0) + 1
  );
  await urlObject.save();

  redirect(urlObject.url);
  return null; // <-- Add this line!
};

export default page;

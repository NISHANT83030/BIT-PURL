"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

type LinkType = {
  _id: string;
  url: string;
  shorturl: string;
  createdAt: string;
};

const LinksPage = () => {
  const { user, isLoaded } = useUser();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      const res = await fetch("/api/user-links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data.links);
      }
      setLoading(false);
    };
    fetchLinks();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen  px-4 py-10">
      {/* Header Greeting */}
      <header className="w-full max-w-3xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-white">
            {isLoaded && user
              ? `Welcome, ${user.firstName || user.username || "User"}!`
              : "Welcome!"}
          </h1>
          <div className="text-lg text-white/80 font-medium">
            Total Links:{" "}
            <span className="text-[#00D1FF] font-bold">{links.length}</span>
          </div>
        </div>
      </header>

      {/* Links Table */}
      <section className="w-full max-w-5xl bg-white/10 rounded-2xl shadow-xl border border-white/20 p-8">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Your Shortened Links
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-white/90">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-3 px-4 font-semibold">Original URL</th>
                <th className="py-3 px-4 font-semibold">Short URL</th>
                <th className="py-3 px-4 font-semibold">Created At</th>
                <th className="py-3 px-4 font-semibold">Analytics</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center fill-[#fff]">
                    <span className="flex flex-col items-center justify-center">
                      <Image
                        src="/loading-circle.svg"
                        alt="Loading..."
                        width={40}
                        height={40}
                        className="mb-2"
                      />
                      <span className="text-white/70">Loading...</span>
                    </span>
                  </td>
                </tr>
              ) : links.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-white/60">
                    No links found.
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr
                    key={link.shorturl}
                    className="hover:bg-white/5 transition"
                  >
                    <td className="py-3 px-4 max-w-[320px] truncate">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#00D1FF] hover:text-[#7C3AED] transition"
                      >
                        {link.url}
                      </a>
                    </td>
                    <td className="py-3 px-4 max-w-[220px] truncate">
                      <Link
                        href={`/${link.shorturl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#7C3AED] hover:underline hover:text-[#00D1FF] transition"
                      >
                        {/* Show only part of the short URL for neatness */}
                        {`${typeof window !== "undefined" ? window.location.origin : ""}/`}
                        <span className="inline-block max-w-[80px] truncate align-bottom">
                          {link.shorturl}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => router.push(`/links/${link._id}`)}
                        className="px-4 py-2 rounded-lg bg-[#0E78F9] text-white font-semibold shadow hover:scale-105 transition cursor-pointer"
                      >
                        Analytics
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default LinksPage;
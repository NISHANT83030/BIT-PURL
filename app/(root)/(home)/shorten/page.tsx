"use client"
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const ShortenPage = () => {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerate = async () => {
    const urlRegex = /^(http|https):\/\/(\w+(:{0,1}\w*)?@)?([\w.-]+)(:[0-9]+)?(\/.*)?$/;
    if (!input.trim() || !urlRegex.test(input)) {
      setError(true);
      setTimeout(() => setError(false), 1200);
      return;
    }
    const urlString = nanoid(10);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const raw = JSON.stringify({
      url: input,
      shorturl: urlString,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("/api/shorten", requestOptions);
      await response.json();
      setShortUrl(`${process.env.NEXT_PUBLIC_HOST}/${urlString}`);
    } catch (error) {
      // Optionally handle error
      console.log("error", error);
    }
    setInput("");
    setCopied(false);
  };

  const handleCopy = () => {
    if (shortUrl) {
      setCopied(true);
      navigator.clipboard.writeText(shortUrl);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[90vh] w-full px-4 py-8">
      <section className="w-full max-w-xl min-h-[600px] bg-white/5 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 p-10 flex flex-col items-center gap-10 justify-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] bg-clip-text text-transparent drop-shadow-lg ">
          Shorten Your URL Instantly
        </h1>
        <div className="w-full flex flex-col gap-4 relative">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            className="flex-1 px-4 py-3 rounded-lg bg-[#23243a] text-white placeholder:text-white/60 border border-[#2e225a] focus:outline-none focus:ring-2 focus:ring-[#00D1FF] transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-[#0E78F9] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
            onClick={handleGenerate}
            type="button"
          >
            Generate
          </Button>
          {/* Error Notification */}
          {error && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-full flex flex-col items-center pointer-events-none z-10">
              <span className="text-red-600 font-semibold text-base flex items-center gap-2 bg-white/90 px-4 py-1 rounded-lg shadow">
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#ef4444" opacity="0.15"/>
                  <path d="M7 7l6 6M13 7l-6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Please enter a valid URL!
              </span>
              <div className="w-full h-1 mt-2 bg-red-200 rounded overflow-hidden">
                <div className="h-full bg-red-500 animate-notify-progress" />
              </div>
              <style>
                {`
                  @keyframes notify-progress {
                    from { width: 100%; }
                    to { width: 0%; }
                  }
                  .animate-notify-progress {
                    animation: notify-progress 1.2s linear forwards;
                  }
                `}
              </style>
            </div>
          )}
        </div>
        {shortUrl && (
          <div className="w-full flex flex-col items-center gap-3 mt-6 relative">
            <span className="text-lg text-white/80">Your shortened URL</span>
            <div className="flex items-center gap-2 bg-[#23243a] px-4 py-3 rounded-lg border border-[#2e225a] w-full justify-between">
              <span className="truncate text-[#00D1FF] font-semibold">{shortUrl}</span>
              <button
                onClick={handleCopy}
                className="ml-2 p-2 rounded-full hover:bg-[#00D1FF]/20 transition cursor-pointer"
                title="Copy to clipboard"
              >
                <Copy size={20} className={copied ? "text-[#00D1FF]" : "text-white"} />
              </button>
            </div>
            {/* Copied Notification */}
            {copied && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-full flex flex-col items-center pointer-events-none">
                <span className="text-green-600 font-semibold text-base flex items-center gap-2 bg-white/90 px-4 py-1 rounded-lg shadow">
                  <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" fill="#22c55e" opacity="0.15"/>
                    <path d="M6 10.5l2.5 2.5L14 8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copied!
                </span>
                <div className="w-full h-1 mt-2 bg-green-200 rounded overflow-hidden">
                  <div className="h-full bg-green-500 animate-notify-progress" />
                </div>
                <style>
                  {`
                    @keyframes notify-progress {
                      from { width: 100%; }
                      to { width: 0%; }
                    }
                    .animate-notify-progress {
                      animation: notify-progress 1.2s linear forwards;
                    }
                  `}
                </style>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default ShortenPage;
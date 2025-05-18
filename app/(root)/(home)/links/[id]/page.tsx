"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Image from "next/image";

type AnalyticsType = {
  url: string;
  shorturl: string;
  createdAt: string;
  clicksByDate: { [date: string]: number };
  totalClicks: number;
};

const AnalyticsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [data, setData] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/user-links/${id}`);
      if (res.ok) {
        const d = await res.json();
        setData(d);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    const res = await fetch(`/api/user-links/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/links");
    }
  };

  // Prepare chart data for current month
  let chartData: { date: string; clicks: number }[] = [];
  if (data?.clicksByDate) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    // Get all days in current month
    const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month}-${String(day).padStart(2, "0")}`;
      chartData.push({
        date: dateStr,
        clicks: data.clicksByDate[dateStr] || 0,
      });
    }
  }

  return (
    <main className="flex flex-col items-center min-h-screen  px-4 py-10">
      <div className="w-full max-w-2xl bg-white/10 rounded-2xl shadow-xl border border-white/20 p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-white text-center mb-2">Link Analytics</h1>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Image
              src="/loading-circle.svg"
              alt="Loading..."
              width={48}
              height={48}
              className="mb-2"
            />
            <span className="text-white/70 text-center">Loading...</span>
          </div>
        ) : !data ? (
          <div className="text-white/70 text-center py-8">No data found.</div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-4">
              <div>
                <span className="font-semibold text-white/80">Original URL: </span>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#00D1FF] hover:text-[#7C3AED] transition"
                >
                  {data.url}
                </a>
              </div>
              <div>
                <span className="font-semibold text-white/80">Short URL: </span>
                <Link
                  href={`/${data.shorturl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#7C3AED] hover:underline hover:text-[#00D1FF] transition"
                >
                  {typeof window !== "undefined"
                    ? `${window.location.origin}/${data.shorturl}`
                    : `/${data.shorturl}`}
                </Link>
              </div>
              <div>
                <span className="font-semibold text-white/80">Created At: </span>
                {new Date(data.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold text-white/80">Total Clicks: </span>
                <span className="text-[#00D1FF] font-bold">{data.totalClicks}</span>
              </div>
            </div>
            <div className="w-full h-72 bg-[#23243a] rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" tick={{ fill: "#fff" }} />
                  <YAxis tick={{ fill: "#fff" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: "#23243a", border: "none", color: "#fff" }}
                    labelStyle={{ color: "#00D1FF" }}
                  />
                  <Line type="monotone" dataKey="clicks" stroke="#00D1FF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleDelete}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#ef4444] to-[#f87171] text-white font-semibold shadow hover:scale-105 transition cursor-pointer"
              >
                Delete Link
              </button>
              <button
                onClick={() => router.push("/links")}
                className="px-6 py-2 rounded-lg bg-[#0E78F9] text-white font-semibold shadow hover:scale-105 transition cursor-pointer"
              >
                Back to Links
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AnalyticsPage;
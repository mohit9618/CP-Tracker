"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecommendations } from "../../../services/recommendations";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function RecommendationsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const result = await getRecommendations();
        setData(result);
      } catch (error) {
        setError("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
      <p className="text-slate-400">
        Finding problems for you...
      </p>
    </div>
  );
  }

  if (error || !data) {
    return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
      <p className="text-red-400">
        {error}
      </p>
    </div>
  );
  }
return (
  <ProtectedRoute>
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">


        {/* Back Button */}

        <Link
          href="/"
          className="inline-block text-slate-400 hover:text-cyan-300 transition mb-8"
        >
          ← Back to Home

        </Link>

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-100">
          Problem Recommendations
          </h1>

          <p className="text-slate-400 mt-3">
            Problems selected for{" "}
            <span className="text-cyan-400 font-semibold">
              {data.codeforcesHandle}
            </span>{" "}
            based on your current rating.
          </p>

        </div>

        {/* User Info */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div className="bg-[#151f35]/90 border border-[#2a3852] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">

            <p className="text-slate-500 text-sm">
              Current Rating
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-2">
              {data.userRating}
            </h2>

          </div>

          <div className="bg-[#151f35]/90 border border-[#2a3852] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">

            <p className="text-slate-500 text-sm">
              Recommended Rating Range
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-2">
              {data.ratingRange.minimum}

              <span className="text-slate-500 mx-3">
                -
              </span>

              {data.ratingRange.maximum}
            </h2>

          </div>

        </div>

        {/* Problems */}

        <div>

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-100">
              Recommended Problems
            </h2>

            <p className="text-slate-500 mt-1">
              These problems haven't been solved by you yet.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {data.recommendations.map(
              (problem: any, index: number) => (

                <a
                  key={`${problem.contestId}-${problem.index}`}
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    bg-[#151f35]/90
                    border
                    border-[#2a3852]
                    rounded-2xl
                    p-6
                    hover:border-cyan-500/50
                    hover:bg-[#19243b]
                    hover:-translate-y-1
                    hover:shadow-[0_10px_30px_rgba(6,182,212,0.08)]
                    transition-all
                    duration-300
                  "
                >

                  {/* Top */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex gap-3">

                      <span className="text-slate-500 font-semibold">
                        #{index + 1}
                      </span>

                      <div>

                        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-400 transition">
                          {problem.name}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {problem.contestId}
                          {problem.index}
                        </p>

                      </div>

                    </div>

                    {/* Rating */}

                    <span className="text-cyan-400 px-3 py-1 rounded-lg text-sm font-semibold">
                      {problem.rating}
                    </span>

                  </div>

                  {/* Tags */}

                  {/* <div className="flex flex-wrap gap-2 mt-5">

                    {problem.tags
                      .slice(0, 4)
                      .map((tag: string) => (

                        <span
                          key={tag}
                          className="bg-[#1a2740] text-slate-400 px-3 py-1 rounded-lg text-xs"
                        >
                          {tag}
                        </span>

                      ))}

                  </div> */}

                  {/* Solve */}

                  <div className="mt-5 text-sm text-cyan-400">
                    Solve on Codeforces →
                  </div>

                </a>

              )
            )}

          </div>

        </div>

      </div>

    </div>
  </ProtectedRoute>
);
}
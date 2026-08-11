"use client";

import { useEffect, useState } from "react";
import { getCodeforcesData } from "../services/codeforces";

export default function UserStats({
  username,
  setUsername,
  setUserData,
}: any) {
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    if (!username.trim()) {
      setUser(null);
      setUserData(null);
      setError("");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Fetching:", username);

      const data = await getCodeforcesData(username);

      console.log("DATA RECEIVED:", data);
      console.log("USER INFO:", data?.userInfo);

      if (!data) {
        throw new Error("User not found");
      }

      setUser(data.userInfo);
      setUserData(data);
      setError("");

    } catch (error) {
      setUser(null);
      setUserData(null);
      setError("User not found");

      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [username]);

  return (
  <div
    className="
      bg-[#111a2e]/80
      backdrop-blur-xl
      border
      border-[#263550]
      rounded-3xl
      p-8
      text-white
      shadow-[0_10px_40px_rgba(0,0,0,0.2)]
    "
  >

    {/* Header */}

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

      <div>

        <h2 className="text-3xl font-bold text-slate-100">
          Codeforces Profile
        </h2>

        <p className="text-slate-400 mt-2">
          Search and analyze any Codeforces user
        </p>

      </div>

    </div>


    {/* Search Bar */}

    <div className="flex flex-col md:flex-row gap-4 mb-8">

      <input
        type="text"
        placeholder="Enter Codeforces username..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setUsername(inputValue.trim());
          }
        }}
        className="
          flex-1
          bg-[#080d19]
          border
          border-[#344258]
          rounded-xl
          px-5
          py-3
          outline-none
          focus:border-cyan-500
          focus:ring-1
          focus:ring-cyan-500/30
          transition
          placeholder:text-slate-600
        "
      />

      <button
        onClick={() => setUsername(inputValue.trim())}
        disabled={!inputValue.trim() || loading}
        className="
          px-6
          py-3
          rounded-xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          font-semibold
          text-black
          shadow-lg
          shadow-cyan-500/10
          hover:from-cyan-400
          hover:to-blue-500
          hover:scale-105
          transition
          disabled:opacity-50
          disabled:hover:scale-100
          disabled:cursor-not-allowed
        "
      >
        {loading ? "Searching..." : "Search"}
      </button>

    </div>


    {/* Error */}

    {error && (
      <div
        className="
          bg-red-500/10
          border
          border-red-500/30
          text-red-400
          p-4
          rounded-xl
          mb-6
        "
      >
        {error}
      </div>
    )}


    {/* User Data */}

    {user && (
      <div className="grid md:grid-cols-2 gap-6">

        {/* User Info Card */}

        <div
          className="
            bg-[#151f35]/90
            border
            border-[#2a3852]
            rounded-2xl
            p-6
            shadow-[0_8px_30px_rgba(0,0,0,0.15)]
            hover:border-cyan-500/20
            hover:bg-[#19243b]
            transition-all
            duration-300
          "
        >

          <h3 className="text-xl font-semibold mb-5 text-slate-100">
            Profile Info
          </h3>

          <div className="space-y-4">

            <div>
              <p className="text-slate-500 text-sm">
                Username
              </p>

              <p className="text-lg font-semibold text-slate-100">
                {user.handle}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-sm">
                Rank
              </p>

              <p className="text-lg font-semibold capitalize text-slate-200">
                {user.rank}
              </p>
            </div>

          </div>

        </div>


        {/* Rating Card */}

        <div
          className="
            bg-[#151f35]/90
            border
            border-[#2a3852]
            rounded-2xl
            p-6
            shadow-[0_8px_30px_rgba(0,0,0,0.15)]
            hover:border-purple-500/20
            hover:bg-[#19243b]
            transition-all
            duration-300
          "
        >

          <h3 className="text-xl font-semibold mb-5 text-slate-100">
            Rating Details
          </h3>

          <div className="space-y-5">

            <div>
              <p className="text-slate-500 text-sm">
                Current Rating
              </p>

              <p className="text-3xl font-bold text-cyan-400">
                {user.rating || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-sm">
                Max Rating
              </p>

              <p className="text-3xl font-bold text-purple-400">
                {user.maxRating || "N/A"}
              </p>
            </div>

          </div>

        </div>

      </div>
    )}

  </div>
);
}
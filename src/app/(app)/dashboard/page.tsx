"use client";

import { useState } from "react";
import UserStats from "../../../components/UserStats";
import RatingChart from "../../../components/RatingChart";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>(null);

  return (
  <div className="flex bg-[#050914] min-h-screen">
    <div className="flex-1 min-h-screen p-8 lg:p-10">

      {/* Header */}

      <div className="mb-10">

        <h1
          className="
            text-5xl
            font-extrabold
            bg-gradient-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            bg-clip-text
            text-transparent
            drop-shadow-[0_0_25px_rgba(99,102,241,0.12)]
          "
        >
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Analyze your competitive programming journey
        </p>

      </div>


      {/* Search Section */}

      <div
        className="
          bg-[#111a2e]/80
          backdrop-blur-xl
          border
          border-[#263550]
          rounded-3xl
          p-6
          mb-8
          shadow-[0_10px_40px_rgba(0,0,0,0.2)]
        "
      >
        <UserStats
          username={username}
          setUsername={setUsername}
          setUserData={setUserData}
        />
      </div>


      {/* Show dashboard data only after search */}

      {userData ? (
        <>

          {/* Stat Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            {/* Current Rating */}

            <div
              className="
                bg-[#111a2e]/90
                backdrop-blur-xl
                rounded-2xl
                p-6
                border
                border-[#263550]
                hover:border-cyan-400/40
                hover:bg-[#151f35]
                hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]
                transition-all
                duration-300
              "
            >
              <p className="text-slate-400 text-sm">
                Current Rating
              </p>

              <h2 className="text-4xl font-bold mt-3 text-cyan-400">
                {userData?.userInfo?.rating || "--"}
              </h2>
            </div>


            {/* Problems Solved */}

            <div
              className="
                bg-[#111a2e]/90
                backdrop-blur-xl
                rounded-2xl
                p-6
                border
                border-[#263550]
                hover:border-blue-400/40
                hover:bg-[#151f35]
                hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)]
                transition-all
                duration-300
              "
            >
              <p className="text-slate-400 text-sm">
                Problems Solved
              </p>

              <h2 className="text-4xl font-bold mt-3 text-slate-100">
                {userData?.totalSolved || "--"}
              </h2>
            </div>


            {/* Contests */}

            <div
              className="
                bg-[#111a2e]/90
                backdrop-blur-xl
                rounded-2xl
                p-6
                border
                border-[#263550]
                hover:border-indigo-400/40
                hover:bg-[#151f35]
                hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)]
                transition-all
                duration-300
              "
            >
              <p className="text-slate-400 text-sm">
                Contests
              </p>

              <h2 className="text-4xl font-bold mt-3 text-slate-100">
                {userData?.totalContests || "--"}
              </h2>
            </div>


            {/* Global Rank */}

            <div
              className="
                bg-[#111a2e]/90
                backdrop-blur-xl
                rounded-2xl
                p-6
                border
                border-[#263550]
                hover:border-purple-400/40
                hover:bg-[#151f35]
                hover:shadow-[0_8px_30px_rgba(168,85,247,0.06)]
                transition-all
                duration-300
              "
            >
              <p className="text-slate-400 text-sm">
                Global Rank
              </p>

              <h2 className="text-4xl font-bold mt-3 text-purple-400">
                {userData?.userInfo?.rank || "--"}
              </h2>
            </div>

          </div>


          {/* Rating Chart */}

          <div
            className="
              bg-[#111a2e]/80
              backdrop-blur-xl
              border
              border-[#263550]
              rounded-3xl
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.2)]
            "
          >

            <div className="mb-5">

              <h2 className="text-2xl font-semibold text-slate-100">
                Rating Progress
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Contest performance over time
              </p>

            </div>

            <RatingChart username={username} />

          </div>

        </>

      ) : (

        <div>
        </div>

      )}

    </div>
  </div>
);
}
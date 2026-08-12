"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../services/auth";
import Link from "next/link";
import { motion } from "framer-motion";

import { FaChartLine, FaTrophy } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { GiCrossedSwords } from "react-icons/gi";


import PageWrapper from "../components/ui/PageWrapper";

const cards = [
  {
    title: "Dashboard",
    icon: <FaChartLine size={28} />,
    href: "/dashboard",
  },
  {
    title: "Compare",
    icon: <GiCrossedSwords size={28} />,
    href: "/compare",
  },
  {
    title: "Contests",
    icon: <FaTrophy size={28} />,
    href: "/contests",
  },
  {
    title: "Leaderboard",
    icon: <MdLeaderboard size={28} />,
    href: "/leaderboard",
  },
];

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    checkUser();
  }, []);
  async function handleLogout() {
  await logout();
  setUser(null);
}

  return (
  <PageWrapper>
    <div className="min-h-screen flex flex-col items-center px-6 py-20 relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/20 blur-[130px] rounded-full" />

        <div className="absolute top-[180px] right-[-150px] w-[400px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full" />

        <div className="absolute top-[500px] left-[-200px] w-[350px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full" />
      </div>


      {/* Login / User */}

      <div className="absolute top-6 right-8 z-10">

        {user ? (

          <div className="flex items-center gap-3">

            <Link
              href="/profile"
              className="
                bg-[#111827]/70
                backdrop-blur-xl
                px-5
                py-3
                rounded-xl
                border
                border-[#263550]
                text-slate-300
                hover:border-indigo-500/50
                hover:text-white
                transition-all
                duration-300
              "
            >
              👤 {user.codeforcesHandle}
            </Link>


            <button
              onClick={handleLogout}
              className="
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                hover:bg-red-500
                hover:text-white
                px-5
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-300
              "
            >
              Logout
            </button>

          </div>

        ) : (

          <Link
            href="/login"
            className="
              bg-gradient-to-r
              from-indigo-500
              to-purple-600
              hover:from-indigo-400
              hover:to-purple-500
              px-6
              py-3
              rounded-xl
              font-semibold
              shadow-[0_8px_30px_rgba(99,102,241,0.25)]
              transition-all
              duration-300
              hover:-translate-y-0.5
            "
          >
            Login
          </Link>

        )}

      </div>


      {/* Hero Section */}

      <motion.h1
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          relative
          text-6xl
          md:text-7xl
          font-extrabold
          text-center
          bg-gradient-to-r
          from-slate-100
          via-indigo-300
          to-purple-400
          bg-clip-text
          text-transparent
          drop-shadow-[0_0_35px_rgba(99,102,241,0.2)]
        "
      >
        CP Tracker
      </motion.h1>


      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
        }}
        className="
          relative
          mt-4
          text-lg
          md:text-xl
          text-slate-300
          text-center
        "
      >
        Track • Analyze • Improve
      </motion.p>


      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        className="
          relative
          mt-3
          text-slate-400
          text-center
          max-w-2xl
          leading-relaxed
        "
      >
        Analyze Codeforces performance, get personalized insights, compare
        profiles, track ratings, visualize progress and stay ahead in
        competitive programming.
      </motion.p>


      {/* Public Feature Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 w-full max-w-4xl">

        {cards.map((card, index) => (

          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.03,
              y: -6,
            }}
          >

            <Link href={card.href}>

              <div
                className="
                  bg-[#111a2e]/75
                  backdrop-blur-xl
                  border
                  border-[#263550]
                  rounded-2xl
                  p-7
                  shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                  hover:border-indigo-500/40
                  hover:bg-[#151f35]/80
                  hover:shadow-[0_10px_40px_rgba(99,102,241,0.12)]
                  transition-all
                  duration-300
                  h-full
                "
              >

                <div className="flex items-center gap-4">

                  <div className="text-indigo-400">
                    {card.icon}
                  </div>

                  <h2 className="text-2xl font-semibold text-slate-100">
                    {card.title}
                  </h2>

                </div>

              </div>

            </Link>

          </motion.div>

        ))}

      </div>


      {/* Personalized Features */}

      {user && (

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
          }}
          className="mt-16 w-full max-w-5xl"
        >

          <h2 className="text-2xl font-bold text-center mb-8 text-slate-100">

            Personalized for{" "}

            <span className="text-indigo-400">
              {user.codeforcesHandle}
            </span>

          </h2>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            {/* Analytics */}

            <Link href="/analytics">

              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -6,
                }}
                className="
                  bg-[#111a2e]/75
                  backdrop-blur-xl
                  border
                  border-[#263550]
                  rounded-2xl
                  p-7
                  h-full
                  hover:border-indigo-500/40
                  hover:bg-[#151f35]/80
                  hover:shadow-[0_10px_40px_rgba(99,102,241,0.12)]
                  transition-all
                  duration-300
                "
              >

                <h3 className="text-xl font-semibold text-slate-100">
                  📊 My Analytics
                </h3>

                <p className="text-slate-400 mt-3 text-sm">
                  Analyze your topics, difficulty levels and
                  problem-solving progress.
                </p>

              </motion.div>

            </Link>


            {/* Recommendations */}

            <Link href="/recommendations">

              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -6,
                }}
                className="
                  bg-[#111a2e]/75
                  backdrop-blur-xl
                  border
                  border-[#263550]
                  rounded-2xl
                  p-7
                  h-full
                  hover:border-indigo-500/40
                  hover:bg-[#151f35]/80
                  hover:shadow-[0_10px_40px_rgba(99,102,241,0.12)]
                  transition-all
                  duration-300
                "
              >

                <h3 className="text-xl font-semibold text-slate-100">
                  🎯 Recommendations
                </h3>

                <p className="text-slate-400 mt-3 text-sm">
                  Get personalized problems based on your
                  Codeforces performance.
                </p>

              </motion.div>

            </Link>


            {/* Contest Reminders */}

            <Link href="/reminders">

              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -6,
                }}
                className="
                  bg-[#111a2e]/75
                  backdrop-blur-xl
                  border
                  border-[#263550]
                  rounded-2xl
                  p-7
                  h-full
                  hover:border-indigo-500/40
                  hover:bg-[#151f35]/80
                  hover:shadow-[0_10px_40px_rgba(99,102,241,0.12)]
                  transition-all
                  duration-300
                "
              >

                <h3 className="text-xl font-semibold text-slate-100">
                  🔔 Contest Reminders
                </h3>

                <p className="text-slate-400 mt-3 text-sm">
                  Save upcoming contests and manage your
                  personal contest reminders.
                </p>

              </motion.div>

            </Link>

          </div>

        </motion.div>

      )}


      {/* Footer */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
        className="
          mt-16
          text-sm
          text-slate-600
          text-center
        "
      >
      </motion.p>

    </div>
  </PageWrapper>
);
}
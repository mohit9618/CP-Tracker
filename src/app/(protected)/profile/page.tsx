"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "../../../services/auth";
import { getCodeforcesData } from "../../../services/codeforces";

export default function ProfilePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Get logged-in user
        const currentUser = await getCurrentUser();

        if (!currentUser) {
          return;
        }

        // Automatically fetch their Codeforces data
        const profileData = await getCodeforcesData(
          currentUser.codeforcesHandle
        );

        setData(profileData);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

 if (loading) {
  return (
    <div className="min-h-screen bg-[#050914] text-white flex items-center justify-center">
      <p className="text-slate-400">
        Loading profile...
      </p>
    </div>
  );
}


if (error || !data) {
  return (
    <div className="min-h-screen bg-[#050914] text-white flex items-center justify-center">
      <p className="text-red-400">
        {error || "Profile not found"}
      </p>
    </div>
  );
}


const user = data.userInfo;


return (
  <main className="min-h-screen bg-[#050914] text-white px-6 py-10">


    <div className="max-w-5xl mx-auto">

      {/* Back to Home */}

      <Link
        href="/"
        className="
          inline-block
          text-slate-400
          hover:text-indigo-300
          transition
          mb-10
        "
      >
        ← Back to Home
      </Link>

  


      {/* Profile Header */}

      <div className="flex items-center gap-5 mb-10">

        <div
          className="
            w-20
            h-20
            rounded-2xl
            bg-[#111a2e]
            border
            border-[#263550]
            flex
            items-center
            justify-center
            text-3xl
            shadow-[0_8px_30px_rgba(0,0,0,0.15)]
          "
        >
          👤
        </div>


        <div>

          <p className="text-indigo-400 text-sm font-medium">
            Codeforces Profile
          </p>

          <h1 className="text-4xl font-bold mt-1 text-slate-100">
            {user.handle}
          </h1>

          <p className="text-slate-400 mt-2 capitalize">
            {user.rank || "Unrated"}
          </p>

        </div>

      </div>


      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        <StatCard
          title="Current Rating"
          value={user.rating ?? "Unrated"}
        />

        <StatCard
          title="Max Rating"
          value={user.maxRating ?? "Unrated"}
        />

        <StatCard
          title="Problems Solved"
          value={data.totalSolved ?? 0}
        />

        <StatCard
          title="Contests"
          value={data.totalContests ?? 0}
        />

      </div>


      {/* Personalized Features */}

      <div>

        <h2 className="text-2xl font-bold mb-6 text-slate-100">
          Your CP Tools
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <FeatureCard
            title="My Analytics"
            description="Explore your rating and topic-wise performance."
            href="/analytics"
          />

          <FeatureCard
            title="Recommendations"
            description="Practice unsolved problems around your rating."
            href="/recommendations"
          />

          <FeatureCard
            title="Contest Reminders"
            description="View and manage your saved contests."
            href="/reminders"
          />

        </div>

      </div>

    </div>

  </main>
);


}


function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div
      className="
        bg-[#111a2e]/90
        backdrop-blur-xl
        border
        border-[#263550]
        rounded-2xl
        p-6
        shadow-[0_8px_30px_rgba(0,0,0,0.15)]
        hover:border-indigo-500/30
        hover:bg-[#151f35]
        transition-all
        duration-300
      "
    >

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-slate-100 text-3xl font-bold mt-3">
        {value}
      </h2>

    </div>
  );
}


function FeatureCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        bg-[#111a2e]/90
        backdrop-blur-xl
        border
        border-[#263550]
        rounded-2xl
        p-6
        hover:border-indigo-500/40
        hover:bg-[#151f35]
        hover:-translate-y-1
        hover:shadow-[0_10px_30px_rgba(99,102,241,0.08)]
        transition-all
        duration-300
      "
    >

      <h3 className="text-xl font-semibold text-slate-100">
        {title}
      </h3>

      <p className="text-slate-400 text-sm mt-3">
        {description}
      </p>

      <p className="text-indigo-400 text-sm mt-5">
        Open →
      </p>

    </Link>
  );
}
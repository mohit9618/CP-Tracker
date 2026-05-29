"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import RatingChart from "../components/RatingChart";
import UserStats from "../components/UserStats";

export default function Home() {
  const [username, setUsername] = useState("tourist");
  const [userData, setUserData] = useState<any>(null);
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-black text-white min-h-screen p-10 ml-64">
        
        <Navbar />

        <h1 className="text-4xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard
  title="Codeforces Rating"
  value={userData?.userInfo?.rating || "Loading"}
/>

<StatCard
  title="Problems Solved"
  value="80"
/>

<StatCard
  title="Daily Streak"
  value="35 Days"
/>

<StatCard
  title="Global Rank"
  value={userData?.userInfo?.rank || "Loading"}
/>
        </div>

        <RatingChart username={username} />
        <UserStats
  username={username}
  setUsername={setUsername}
  setUserData={setUserData}
/>

      </div>
    </div>
  );
}
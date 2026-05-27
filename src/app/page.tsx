import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import RatingChart from "@/components/RatingChart";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-black text-white min-h-screen p-10 ml-64">
        
        <Navbar />

        <h1 className="text-4xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Codeforces Rating" value="1450" />

          <StatCard title="Problems Solved" value="320" />

          <StatCard title="Daily Streak" value="12 Days" />

          <StatCard title="Global Rank" value="#4521" />
        </div>

        <RatingChart />

      </div>
    </div>
  );
}
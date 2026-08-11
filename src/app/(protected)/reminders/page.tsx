"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getReminders,
  deleteReminder,
} from "../../../services/reminders";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function RemindersPage() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReminders() {
      try {
        const data = await getReminders();
        setReminders(data);
      } catch {
        setError("Failed to load reminders");
      } finally {
        setLoading(false);
      }
    }

    fetchReminders();
  }, []);

  async function handleDelete(id: string) {
    try {
      await deleteReminder(id);

      setReminders((prev) =>
        prev.filter((reminder) => reminder._id !== id)
      );
    } catch {
      setError("Failed to remove reminder");
    }
  }

  function formatContestTime(startTimeSeconds: number) {
    return new Date(
      startTimeSeconds * 1000
    ).toLocaleString();
  }

  if (loading) {
    return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#2a3852] border-t-cyan-400 rounded-full animate-spin mx-auto" />

        <p className="text-slate-400 mt-4">
          Loading your reminders...
        </p>
      </div>
    </div>
  );
  }

  return (
  <ProtectedRoute>
    <main className="min-h-screen bg-[#0B0F19] text-white px-6 py-10">

      <div className="w-full max-w-6xl mx-auto">

        {/* Back Button */}

        <Link
          href="/"
          className="inline-flex items-center text-slate-400 hover:text-cyan-300 transition mb-10"
        >
          ← Back to Home

        </Link>

        {/* Header */}

        <div className="mb-12">

          <h1 className="text-4xl md:text-5xl font-bold text-slate-100">
            Contest Reminders
          </h1>

          <p className="text-slate-400 mt-4 max-w-xl">
            Save upcoming competitive programming contests
            and keep track of the events you don't want to miss.
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-xl">
            {error}
          </div>
        )}

        {/* Empty State */}

        {reminders.length === 0 ? (

          <div className="flex justify-center mt-16">

            <div
              className="
                w-full
                max-w-7xl
                bg-[#151f35]/90
                border
                border-[#2a3852]
                rounded-3xl
                px-8
                py-14
                text-center
                shadow-[0_10px_40px_rgba(0,0,0,0.2)]
              "
            >

              {/* Icon */}

              {/* <div
                className="
                  w-20
                  h-20
                  mx-auto
                  rounded-2xl
                  bg-cyan-500/10
                  border
                  border-cyan-500/20
                  flex
                  items-center
                  justify-center
                  text-4xl
                  mb-7
                "
              >
                🔔
              </div> */}

              <h2 className="text-2xl font-bold text-slate-100">
                <br />
                <br />
                No contest reminders yet
              </h2>

              <p className="text-slate-400 mt-3 max-w-md mx-auto leading-relaxed">
                Browse upcoming contests and save the ones
                you want to participate in.
                <br />
                <br />
                <br /><br />
                <br />
              </p>

              <Link
                href="/contests"
                className="
                  inline-flex
                  items-center
                  justify-center
                  mt-8
                  bg-cyan-500
                  hover:bg-cyan-400
                  text-black
                  font-semibold
                  px-7
                  py-3
                  rounded-xl
                  transition
                  duration-300
                  hover:-translate-y-1
                "
              >
                Browse Contests

                <span className="ml-2">
                  →
                </span>
              </Link>

            </div>

          </div>

        ) : (

          /* Reminders */

          <div>

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-slate-100">
                  Your Saved Contests
                </h2>

                <p className="text-slate-400 mt-1">
                  {reminders.length} contest
                  {reminders.length !== 1 ? "s" : ""} saved
                </p>

              </div>

              <Link
                href="/contests"
                className="
                  bg-cyan-500/10
                  text-cyan-400
                  border
                  border-cyan-500/20
                  hover:bg-cyan-500/20
                  px-5
                  py-2.5
                  rounded-xl
                  transition
                "
              >
                + Add Contest
              </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {reminders.map((reminder) => (

                <div
                  key={reminder._id}
                  className="
                    bg-[#151f35]/90
                    border
                    border-[#2a3852]
                    rounded-2xl
                    p-6
                    hover:border-cyan-500/30
                    hover:bg-[#19243b]
                    transition-all
                    duration-300
                  "
                >

                  <div className="flex justify-between items-start gap-5">

                    <div>

                      <div className="flex items-center gap-2 mb-3">

                        <span className="w-2 h-2 bg-cyan-400 rounded-full" />

                        <span className="text-xs uppercase tracking-wider text-cyan-400">
                          Upcoming Contest
                        </span>

                      </div>

                      <h2 className="text-xl font-semibold text-slate-100">
                        {reminder.contestName}
                      </h2>

                      <p className="text-slate-400 mt-3">
                        {" "}
                        {formatContestTime(
                          reminder.startTimeSeconds
                        )}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        handleDelete(reminder._id)
                      }
                      className="
                        shrink-0
                        bg-red-500/10
                        text-red-400
                        hover:bg-red-500/20
                        border
                        border-red-500/20
                        px-4
                        py-2
                        rounded-lg
                        transition
                      "
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </main>
  </ProtectedRoute>
);
}
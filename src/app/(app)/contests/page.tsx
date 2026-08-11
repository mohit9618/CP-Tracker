"use client";

import { useEffect, useState } from "react";
import { getContests } from "../../../services/contests";
import {addReminder,getReminders} from "../../../services/reminders";



export default function ContestsPage() {
  const [contests, setContests] = useState([]);
  const [reminderMessage, setReminderMessage] = useState("");
  const [addedReminders, setAddedReminders] = useState<string[]>([]);
  

async function handleAddReminder(contest: any) {
  try {
    await addReminder({
      contestId: String(contest.id),
      contestName: contest.name,
      startTimeSeconds: contest.startTimeSeconds,
    });

    setAddedReminders((prev) => [
      ...prev,
      String(contest.id),
    ]);

    setReminderMessage("Reminder added successfully!");

    setTimeout(() => {
      setReminderMessage("");
    }, 3000);

  } catch (error: any) {
    setReminderMessage(
      error.message || "Failed to add reminder"
    );

    setTimeout(() => {
      setReminderMessage("");
    }, 3000);
  }
}
{reminderMessage && (
  <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-cyan-500/30 text-cyan-400 px-5 py-3 rounded-xl shadow-xl">
    {reminderMessage}
  </div>
)}
  useEffect(() => {
    async function fetchContests() {
      const data = await getContests();
      setContests(data);
    }

    fetchContests();
  }, []);
  useEffect(() => {
  async function loadExistingReminders() {
    try {
      const reminders = await getReminders();

      const reminderIds = reminders.map(
        (reminder: any) => String(reminder.contestId)
      );

      setAddedReminders(reminderIds);
    } catch (error) {
      console.log("Could not load reminders");
    }
  }

  loadExistingReminders();
}, []);
  const upcoming = contests
    .filter((contest) => contest.phase === "BEFORE")
    .sort(
      (a, b) =>
        a.startTimeSeconds - b.startTimeSeconds
    );
    

  const past = contests
    .filter((contest) => contest.phase === "FINISHED")
    .slice(0, 20);

  return (
  <div className="min-h-screen bg-[#0B0F19] text-white p-8 lg:p-10">

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
        "
      >
        Contests
      </h1>

      <p className="text-slate-400 mt-3">
        Stay updated with upcoming and past Codeforces contests
      </p>
    </div>

    {/* Upcoming Contests */}

    <div className="mb-12">

      <h2 className="text-3xl font-bold text-slate-100 mb-6">
        Upcoming Contests
      </h2>

      <div className="grid gap-5">

        {upcoming.length === 0 ? (
          <div className="bg-[#151f35]/90 rounded-2xl p-6 border border-[#2a3852]">
            No upcoming contests found.
          </div>
        ) : (
          upcoming.map((contest) => (
            <div
              key={contest.id}
              className="
                bg-[#151f35]/90
                backdrop-blur-md
                border
                border-[#2a3852]
                rounded-2xl
                p-6
                hover:border-cyan-500/30
                hover:bg-[#19243b]
                hover:-translate-y-1
                transition-all
              "
            >

              <button
                onClick={() => handleAddReminder(contest)}
                disabled={addedReminders.includes(String(contest.id))}
                style={{ cursor: "pointer" }}
                className={`
                  mt-4
                  px-4
                  py-2
                  rounded-lg
                  font-medium
                  border
                  transition-all
                  duration-300

                  ${
                    addedReminders.includes(String(contest.id))
                      ? `
                        bg-green-500/10
                        text-green-400
                        border-green-500/30
                        cursor-default
                      `
                      : `
                        bg-cyan-500/10
                        text-cyan-400
                        border-cyan-500/30
                        hover:bg-cyan-500
                        hover:text-black
                        hover:-translate-y-1
                      `
                  }
                `}
              >
                {addedReminders.includes(String(contest.id))
                  ? "✓ Reminder Added"
                  : " Set Reminder"}
              </button>

              <br /><br />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <h3 className="text-2xl font-semibold text-slate-100">
                    {contest.name}
                  </h3>

                  <p className="text-slate-400 mt-3">
                    Starts:
                    {" "}
                    {new Date(
                      contest.startTimeSeconds * 1000
                    ).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p className="text-slate-400 mt-1">
                    Duration:
                    {" "}
                    {Math.floor(
                      contest.durationSeconds / 3600
                    )}
                    hrs
                  </p>

                </div>

                <div
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-cyan-500/10
                    text-cyan-400
                    border
                    border-cyan-500/20
                    font-semibold
                    w-fit
                  "
                >
                  Upcoming
                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>

    {/* Past Contests */}

    <div>

      <h2 className="text-3xl font-bold text-slate-100 mb-6">
        Recent Contests
      </h2>

      <div className="grid gap-5">

        {past.map((contest) => (
          <div
            key={contest.id}
            className="
              bg-[#151f35]/90
              backdrop-blur-md
              border
              border-[#2a3852]
              rounded-2xl
              p-6
              hover:border-purple-500/30
              hover:bg-[#19243b]
              hover:-translate-y-1
              transition-all
            "
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>

                <h3 className="text-2xl font-semibold text-slate-100">
                  {contest.name}
                </h3>

                <p className="text-slate-400 mt-3">
                  Date:
                  {" "}
                  {new Date(
                    contest.startTimeSeconds * 1000
                  ).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-slate-400 mt-1">
                  Duration:
                  {" "}
                  {Math.floor(
                    contest.durationSeconds / 3600
                  )}
                  hrs
                </p>

              </div>

              <div
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-purple-500/10
                  text-purple-400
                  border
                  border-purple-500/20
                  font-semibold
                  w-fit
                "
              >
                Finished
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>

  </div>
);
}
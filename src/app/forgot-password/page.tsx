"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forgotPassword } from "../../services/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await forgotPassword(codeforcesHandle);

      if (data.success) {
        router.push(
          `/reset-password?handle=${encodeURIComponent(codeforcesHandle)}`
        );
      } else {
        setError(data.error || data.message);
      }
    } catch {
      setError("Something went wrong.");
    }

    setLoading(false);
  }

  return (
  <main className="relative min-h-screen bg-[#050914] text-white flex items-center justify-center overflow-hidden">

    {/* Background Glow */}

    <div className="absolute inset-0 pointer-events-none">

      <div
        className="
          absolute
          top-[-180px]
          left-1/2
          -translate-x-1/2
          w-[650px]
          h-[400px]
          bg-indigo-600/15
          blur-[130px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-[-180px]
          right-[-150px]
          w-[400px]
          h-[400px]
          bg-purple-600/10
          blur-[130px]
          rounded-full
        "
      />

    </div>


    {/* Back to Home */}

    <Link
      href="/"
      className="
        absolute
        top-6
        left-8
        text-slate-400
        hover:text-indigo-300
        transition
        z-10
      "
    >
      ← Back to Home
    </Link>


    <div
      className="flex flex-col relative z-10"
      style={{
        width: "360px",
        maxWidth: "calc(100vw - 40px)",
      }}
    >

      {/* Logo */}

      <div className="text-center mb-10">

        <h1
          className="
            text-5xl
            font-extrabold
            bg-gradient-to-r
            from-slate-100
            via-indigo-300
            to-purple-400
            bg-clip-text
            text-transparent
            drop-shadow-[0_0_30px_rgba(99,102,241,0.18)]
          "
        >
          CP Tracker
        </h1>

        <p className="text-slate-400 mt-3">
          Track • Analyze • Improve
        </p>

      </div>


      {/* Heading */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-100">
          Forgot Password
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Enter your Codeforces handle to receive a password reset OTP.
        </p>

      </div>


      {/* Form */}

      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col gap-5"
      >

        <div>

          <label className="block text-sm text-slate-300 mb-2">
            Codeforces Handle
          </label>

          <input
            type="text"
            value={codeforcesHandle}
            onChange={(e) =>
              setCodeforcesHandle(e.target.value)
            }
            placeholder="Enter your handle"
            required
            className="
              block
              w-full
              box-border
              bg-[#111a2e]/80
              backdrop-blur-xl
              border
              border-[#263550]
              rounded-xl
              px-4
              py-3
              text-slate-100
              placeholder:text-slate-600
              outline-none
              focus:border-indigo-500
              focus:ring-1
              focus:ring-indigo-500/30
              transition
            "
          />

        </div>


        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}


        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            cursor-pointer
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            hover:from-indigo-400
            hover:to-purple-500
            text-white
            font-semibold
            py-3
            rounded-xl
            shadow-[0_8px_30px_rgba(99,102,241,0.20)]
            transition-all
            duration-300
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>


        <p className="text-center text-sm text-slate-500">
          Remember your password?
        </p>


        <Link
          href="/login"
          className="
            text-center
            text-indigo-400
            hover:text-indigo-300
            text-sm
            transition
          "
        >
          Back to Login
        </Link>

      </form>

    </div>

  </main>
);
}
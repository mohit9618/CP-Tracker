"use client";

import { useEffect, useState } from "react";
import { getCodeforcesData } from "../services/codeforces";

export default function UserStats({
  username,
  setUsername,
  setUserData,
}: any) {

  const [inputValue, setInputValue] = useState("tourist");

  const [user, setUser] = useState<any>(null);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  async function fetchUser() {

    try {

      setLoading(true);

      setError("");
      console.log(username);
      const data = await getCodeforcesData(username);

console.log("FULL DATA:", data);
console.log("USER INFO:", data?.userInfo);

      if (!data) {
        throw new Error("User not found");
      }
console.log("SETTING USER:", data.userInfo);
      setUser(data.userInfo);

      setUserData(data);

    } catch (error) {

      setError("User not found");

      console.log(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    fetchUser();

  }, [username]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-10 text-white">

      <h2 className="text-3xl font-bold mb-6">
        Codeforces Profile
      </h2>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Enter username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-black border border-gray-700 px-4 py-2 rounded-lg outline-none"
        />

        <button
          onClick={() => setUsername(inputValue)}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>

      </div>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      {user && (
        <div className="space-y-3">

          <p>
            Username: {user.handle}
          </p>

          <p>
            Rating: {user.rating}
          </p>

          <p>
            Max Rating: {user.maxRating}
          </p>

          <p>
            Rank: {user.rank}
          </p>

        </div>
      )}

    </div>
  );
}
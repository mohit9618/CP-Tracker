"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../services/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.replace("/login");
          return;
        }

        setChecking(false);
      } catch {
        router.replace("/login");
      }
    }

    checkAuthentication();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#070b16] flex items-center justify-center">
        <p className="text-slate-400">
          Checking authentication...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
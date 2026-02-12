"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function YourCardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <span>Loading...</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold">
        🎉 Welcome! This is Your Card Dashboard
      </h1>
    </main>
  );
}

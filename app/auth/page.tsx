"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // ✅ Auth guard: kick user to /auth if not logged in
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        setErr(error.message);
        setLoading(false);
        return;
      }

      if (!data.session) {
        router.push("/auth");
        return;
      }

      setUserEmail(data.session.user.email ?? null);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [router, supabase]);

  async function handleLogout() {
    setErr(null);
    setLoading(true);

    const { error } = await supabase.auth.signOut();
    if (error) {
      setErr(error.message);
      setLoading(false);
      return;
    }

    router.push("/auth");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-700">Loading dashboard…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 text-sm">
              Signed in as {userEmail ?? "Unknown"}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-50"
            >
              Home
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-gray-900 px-4 py-2 text-white font-semibold hover:bg-black"
            >
              Log out
            </button>
          </div>
        </div>

        {err && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}

        {/* ✅ Put your dashboard content here */}
        <div className="mt-6 rounded-2xl bg-white shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Your ClickCard
          </h2>
          <p className="mt-1 text-gray-600">
            Next: show card settings, public link, and Pro upgrade.
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              href="/c/demo"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-50"
            >
              View Demo Card
            </Link>

            <Link
              href="/auth"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-50"
            >
              Auth Page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
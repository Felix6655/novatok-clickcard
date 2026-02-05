"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signUp() {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth`,
        },
      });
      if (error) throw error;
      setMsg("Signup success. Check your email if confirmation is enabled.");
    } catch (e: any) {
      setErr(e?.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  async function logIn() {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setMsg("Logged in.");
    } catch (e: any) {
      setErr(e?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function logOut() {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setMsg("Logged out.");
    } catch (e: any) {
      setErr(e?.message ?? "Logout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-14">
        <div className="mx-auto max-w-md">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back
          </Link>

          <div className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="px-6 py-6">
              <h1 className="text-2xl font-bold text-gray-900">Login / Sign up</h1>
              <p className="mt-1 text-sm text-gray-600">
                Create an account or log in to manage your ClickCard.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="current-password"
                  />
                </div>

                {err ? (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {err}
                  </div>
                ) : null}

                {msg ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                    {msg}
                  </div>
                ) : null}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={signUp}
                    disabled={loading}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={logIn}
                    disabled={loading}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
                  >
                    Log in
                  </button>
                </div>

                <button
                  onClick={logOut}
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            By continuing, you agree to the basics. We’ll keep it simple.
          </p>
        </div>
      </div>
    </main>
  );
}
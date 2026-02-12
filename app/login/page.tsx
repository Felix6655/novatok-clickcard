"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ SIGN UP
  async function handleSignup() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/your-card";
    }

    setLoading(false);
  }

  // ✅ LOG IN + REDIRECT
  async function handleLogin() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/your-card";
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-[#05080f] text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Login / Sign up</h1>

        {/* ✅ Continue without login (PUBLIC ROUTE) */}
        <Link
          href="/c/demo"
          className="w-full inline-flex items-center justify-center rounded-xl py-3 font-semibold bg-white text-black hover:opacity-90 transition"
        >
          Continue without login
        </Link>

        <p className="text-xs text-white/60 mt-2 text-center">
          No account needed to browse. Create one only when you want to save.
        </p>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px w-full bg-white/10" />
          <span className="text-xs text-white/50">or</span>
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSignup}
              disabled={loading}
              className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500 transition"
            >
              Sign up
            </button>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 rounded-xl bg-white/10 py-3 font-semibold hover:bg-white/20 transition"
            >
              Log in
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-white/70 pt-3 text-center">{message}</p>
          )}
        </div>

        {/* Back */}
        <div className="mt-6">
          <Link href="/" className="text-sm text-white/60 hover:text-white">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
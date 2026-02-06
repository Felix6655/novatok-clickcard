"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      window.location.href = "/dashboard";
    }
  }

  async function signup() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    alert("Account created. Now click Log In.");
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] border p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Login / Sign up</h1>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded mb-2"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <button
          onClick={signup}
          disabled={loading}
          className="w-full bg-gray-200 py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}
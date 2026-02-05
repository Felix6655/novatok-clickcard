"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function signUp() {
    setMsg("Signing up...");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);
    setMsg("Signup success. Check your email if confirmation is enabled.");
  }

  async function signIn() {
    setMsg("Signing in...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    setMsg("Signed in ✅ You can go back and upgrade to Pro.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setMsg("Signed out.");
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>Login / Sign up</h1>

      <label>Email</label>
      <input
        style={{ width: "100%", padding: 10, margin: "8px 0" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
      />

      <label>Password</label>
      <input
        style={{ width: "100%", padding: 10, margin: "8px 0" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="••••••••"
      />

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={signUp}>Sign up</button>
        <button onClick={signIn}>Log in</button>
        <button onClick={signOut}>Log out</button>
      </div>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  );
}

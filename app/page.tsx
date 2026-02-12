import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to ClickCard</h1>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 bg-black text-white rounded-lg font-semibold">Login / Sign up</Link>
        <Link href="/c/demo" className="px-6 py-3 bg-gray-200 rounded-lg font-semibold">Continue without login</Link>
      </div>
    </main>
  );
}
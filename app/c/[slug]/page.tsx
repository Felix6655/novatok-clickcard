export default function CardPublicPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Public Card Page</h1>
        <p className="text-gray-500 text-center">This card is public and does not require login.</p>
        {/* TODO: Render card details here based on slug */}
      </div>
    </main>
  );
}
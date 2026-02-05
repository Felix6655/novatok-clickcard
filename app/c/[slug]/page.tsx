import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

type CardData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  links: string[];
};

const mockCards: Record<string, CardData> = {
  demo: {
    name: "Demo User",
    title: "NovaTok Creator",
    email: "demo@novatok.com",
    phone: "(555) 555-5555",
    links: ["Instagram", "X", "YouTube"],
  },
};

export default function CardPage({
  params,
}: {
  params: { slug: string };
}) {
  const card = mockCards[params.slug];

  if (!card) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Card not found</h1>
      </main>
    );
  }

  const cardUrl = `https://novatok-clickcard.vercel.app/c/${params.slug}`;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to home
        </Link>

        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto" />
          <h1 className="text-2xl font-bold">{card.name}</h1>
          <p className="text-gray-500">{card.title}</p>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Email:</strong> {card.email}</p>
          <p><strong>Phone:</strong> {card.phone}</p>
          <p><strong>Links:</strong> {card.links.join(", ")}</p>
        </div>

        <div className="flex justify-center bg-gray-100 rounded-xl p-6">
          <QRCodeSVG value={cardUrl} size={180} />
        </div>

        <p className="text-center text-xs text-gray-500">
          Scan to open this ClickCard
        </p>
      </div>
    </main>
  );
}
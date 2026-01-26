import dynamic from "next/dynamic";
const CardQRCode = dynamic(() => import("./CardQRCode"), { ssr: false });
import { CARDS } from "../../lib/cards";
type Props = { params: { slug: string } };

export default function PublicCardPage({ params }: Props) {
  const { slug } = params;
  const card = CARDS[slug];

  if (!card) {
    return (
      <main className="mx-auto max-w-md px-6 py-10">
        <div className="rounded-2xl border p-6 shadow-sm text-center">
          <h1 className="mt-4 text-2xl font-semibold">Card not found</h1>
          <p className="text-sm text-muted-foreground">Slug: {slug}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <div className="rounded-2xl border p-6 shadow-sm">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
        <h1 className="mt-4 text-2xl font-semibold">{card.name}</h1>
        <p className="text-sm text-muted-foreground">Slug: {slug}</p>

        <div className="mt-6 space-y-2 text-sm">
          {card.title && (
            <p><span className="font-medium">Title:</span> {card.title}</p>
          )}
          <p><span className="font-medium">Email:</span> {card.email}</p>
          <p><span className="font-medium">Phone:</span> {card.phone}</p>
          <p><span className="font-medium">Links:</span> {card.links.join(", ")}</p>
        </div>

        <div className="mt-6 rounded-xl bg-zinc-100 p-6 text-center text-sm">
          <CardQRCode />
        </div>
      </div>
    </main>
  );
}

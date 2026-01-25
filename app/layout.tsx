import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Novatok ClickCard',
  description: 'Dynamic QR codes and mobile-first digital card pages for payments, contacts, and links.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

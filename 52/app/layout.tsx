import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '52',
  description: '52',
  generator: '52',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

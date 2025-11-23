import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EuroJackpot Profi-Tipp Generator',
  description: 'Professioneller EuroJackpot Zahlen-Generator mit strategischer Analyse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import ThemeRegistry from '@/components/theme-registry'
import './globals.css'
import { AppProvider } from '@/providers'

export const metadata: Metadata = {
  title: 'Trello',
  description: 'Build a Trello application'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AppProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </AppProvider>
      </body>
    </html>
  )
}

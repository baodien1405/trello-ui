import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import NextTopLoader from 'nextjs-toploader'

import { AppProvider } from '@/providers'
import { theme } from '@/utils'

import './globals.css'

export const metadata: Metadata = {
  title: 'Trello',
  description: 'Build a Trello application'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={false} />

        <AppProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AppProvider>
      </body>
    </html>
  )
}

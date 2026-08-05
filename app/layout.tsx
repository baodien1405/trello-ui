import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import NextTopLoader from 'nextjs-toploader'
import GlobalStyles from '@mui/material/GlobalStyles'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

import { AppProvider } from '@/providers'
import { theme } from '@/utils'

export const metadata: Metadata = {
  title: 'Trello',
  description: 'Build a Trello application'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={false} />
        <AppProvider>
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AppProvider>
      </body>
    </html>
  )
}

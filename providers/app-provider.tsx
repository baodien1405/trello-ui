'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfirmOptions, ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'

import RefreshToken from '@/components/refresh-token'

import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const DEFAULT_CONFIRM_OPTIONS: ConfirmOptions = {
  allowClose: false,
  dialogProps: { maxWidth: 'xs' },
  cancellationButtonProps: { color: 'inherit', sx: { fontFamily: 'inherit' } },
  confirmationButtonProps: {
    color: 'secondary',
    variant: 'outlined',
    autoFocus: true,
    sx: { fontFamily: 'inherit' }
  },
  titleProps: { fontFamily: 'inherit' },
  contentProps: { sx: { '& > p': { fontFamily: 'inherit' } } }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmProvider defaultOptions={DEFAULT_CONFIRM_OPTIONS}>
        {children}

        <RefreshToken />
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </ConfirmProvider>
    </QueryClientProvider>
  )
}

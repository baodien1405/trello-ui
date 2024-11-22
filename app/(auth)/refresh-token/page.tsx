import { Metadata } from 'next'

import { RefreshToken } from '@/app/(auth)/refresh-token/_components'

export const metadata: Metadata = {
  title: 'Refresh token redirect',
  description: 'Refresh token redirect',
  robots: {
    index: false
  }
}

export default function RefreshTokenPage() {
  return <RefreshToken />
}

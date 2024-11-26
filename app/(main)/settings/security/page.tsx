import { Metadata } from 'next'

import { SettingsContainer } from '@/app/(main)/settings/_components'

export const metadata: Metadata = {
  title: 'Security',
  description: 'This is security page'
}

export default function SecurityPage() {
  return <SettingsContainer />
}

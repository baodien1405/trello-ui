import { Metadata } from 'next'

import { SettingsContainer } from '@/app/(main)/settings/_components'

export const metadata: Metadata = {
  title: 'Account',
  description: 'This is account page'
}

export default function AccountPage() {
  return <SettingsContainer />
}

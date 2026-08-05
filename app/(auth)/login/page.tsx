import { Metadata } from 'next'

import { LoginContainer } from './_components'

export const metadata: Metadata = {
  title: 'Login',
  description: 'This is a login page'
}

export default function LoginPage() {
  return <LoginContainer />
}

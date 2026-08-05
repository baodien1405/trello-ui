import { Metadata } from 'next'

import { RegisterContainer } from './_components'

export const metadata: Metadata = {
  title: 'Register',
  description: 'This is a register page'
}

export default function RegisterPage() {
  return <RegisterContainer />
}

import { Suspense } from 'react'
import { Metadata } from 'next'

import { VerifyAccount } from '@/app/(main)/account/verification/_components'

export const metadata: Metadata = {
  title: 'Verification',
  description: 'This is a verification page'
}

export default function VerificationPage() {
  return (
    <Suspense>
      <VerifyAccount />
    </Suspense>
  )
}

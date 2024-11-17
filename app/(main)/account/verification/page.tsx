'use client'

import { useSearchParams, notFound, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { authApi } from '@/api'
import SpinnerLoading from '@/components/spinner-loading'
import { RoutePath } from '@/constants'

export default function VerificationPage() {
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')
  const token = searchParams.get('token')

  useEffect(() => {
    if (email && token) {
      authApi.verify({ email, token }).then(() => {
        setVerified(true)
      })
    }
  }, [email, token])

  if (!email || !token) {
    notFound()
  }

  if (!verified) {
    return <SpinnerLoading caption="Verifying your account..." />
  }

  return router.push(`${RoutePath.LOGIN}?verifiedEmail=${email}`)
}

'use client'

import { useSearchParams, notFound, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import SpinnerLoading from '@/components/spinner-loading'
import { RoutePath } from '@/constants'
import { useVerifyAccountMutation } from '@/hooks'

export function VerifyAccount() {
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const verifyAccountRequestRef = useRef<any>(null)
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const { mutateAsync, isPending } = useVerifyAccountMutation()

  useEffect(() => {
    if (!verifyAccountRequestRef.current && email && token) {
      verifyAccountRequestRef.current = mutateAsync

      mutateAsync({ email, token }).then(() => {
        setTimeout(() => {
          verifyAccountRequestRef.current = null
        }, 1000)

        toast.success(
          'Account verified successfully! Now you can login to enjoy our services! Have a good day!',
          { theme: 'colored' }
        )
        setVerified(true)

        router.push(`${RoutePath.LOGIN}?verifiedEmail=${email}`)
      })
    }
  }, [email, token, mutateAsync, router])

  if (!email || !token) {
    notFound()
  }

  if (!verified || isPending) {
    return <SpinnerLoading caption="Verifying your account..." />
  }

  return null
}

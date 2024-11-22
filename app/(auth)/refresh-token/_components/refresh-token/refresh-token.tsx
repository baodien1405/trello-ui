'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { RoutePath } from '@/constants'

export function RefreshToken() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refreshTokenFromUrl = searchParams?.get('refreshToken')
  const redirectPath = searchParams?.get('redirect')

  useEffect(() => {
    if (refreshTokenFromUrl && refreshTokenFromUrl === Cookies.get('refreshToken')) {
      // checkAndRefreshToken({
      //   onSuccess: () => {
      //     router.push(redirectPath || RoutePath.HOME)
      //   }
      // })
    } else {
      router.push(RoutePath.HOME)
    }
  }, [redirectPath, refreshTokenFromUrl, router])

  return null
}

'use client'

import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { RoutePath } from '@/constants'
import { User } from '@/models'
import { checkAndRefreshToken } from '@/utils'

export interface TokenPayload {
  user: User
  exp: number
  iat: number
}

export function RefreshToken() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refreshTokenFromUrl = searchParams?.get('refreshToken')
  const redirectPath = searchParams?.get('redirect')

  useEffect(() => {
    if (refreshTokenFromUrl && refreshTokenFromUrl === Cookies.get('refreshToken')) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectPath || RoutePath.HOME)
        }
      })
    } else {
      router.push(RoutePath.HOME)
    }
  }, [redirectPath, refreshTokenFromUrl, router])

  return null
}

'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { RoutePath } from '@/constants'
import { useAppStore } from '@/hooks'
import { checkAndRefreshToken } from '@/utils'

const UNAUTHENTICATED_PATH_LIST: string[] = [
  RoutePath.LOGIN,
  RoutePath.REGISTER,
  RoutePath.REFRESH_TOKEN
]

const TIME_REFRESH_TOKEN = 1000 * 60 * 2

export default function RefreshToken() {
  const router = useRouter()
  const pathname = usePathname()
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)

  useEffect(() => {
    if (UNAUTHENTICATED_PATH_LIST.includes(pathname)) return

    let interval: any = null

    const handleRefreshToken = (force?: boolean) => {
      checkAndRefreshToken({
        onError: () => {
          clearInterval(interval)
          setCurrentUser(null)
          router.push(RoutePath.LOGIN)
        },
        force
      })
    }

    handleRefreshToken()

    interval = setInterval(handleRefreshToken, TIME_REFRESH_TOKEN)

    return () => {
      clearInterval(interval)
    }
  }, [pathname, router, setCurrentUser])

  return null
}

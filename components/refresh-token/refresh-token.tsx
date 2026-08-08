'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { RoutePath } from '@/constants'
import { useAppStore, useLogoutMutation } from '@/hooks'
import { checkAndRefreshToken } from '@/utils'

const UNAUTHENTICATED_PATH_LIST: string[] = [
  RoutePath.LOGIN,
  RoutePath.REGISTER,
  RoutePath.REFRESH_TOKEN
]

// access token: 1 day, refresh token: 7 days
// exp = 1h => set TIME_REFRESH_TOKEN = 1000 * 60 * 2
// exp = 24h => set TIME_REFRESH_TOKEN = 1000 * 60 * 48
const TIME_REFRESH_TOKEN = 1000 * 60 * 48

export default function RefreshToken() {
  const router = useRouter()
  const pathname = usePathname()
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)
  const { mutate: mutateLogout } = useLogoutMutation()

  useEffect(() => {
    if (UNAUTHENTICATED_PATH_LIST.includes(pathname)) return

    let interval: any = null

    const handleRefreshToken = (force?: boolean) => {
      checkAndRefreshToken({
        onError: () => {
          clearInterval(interval)
          mutateLogout()
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

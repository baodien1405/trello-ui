import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { RoutePath } from '@/constants'
import { useAppStore } from '@/hooks'
import { checkAndRefreshToken } from '@/utils'

const UNAUTHENTICATED_PATH_LIST: string[] = [RoutePath.LOGIN, RoutePath.REFRESH_TOKEN]

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

    interval = setInterval(handleRefreshToken, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [pathname, router, setCurrentUser])

  return null
}

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authApi } from '@/api'
import {
  removeAbsoluteExpToLS,
  removeAccessTokenToLS,
  removeRefreshTokenToLS,
  removeUserToLS
} from '@/utils'
import { useAppStore } from '@/hooks/stores'
import { RoutePath } from '@/constants'

export const useLogoutMutation = () => {
  const router = useRouter()
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      setCurrentUser(null)
      removeUserToLS()
      removeAccessTokenToLS()
      removeRefreshTokenToLS()
      removeAbsoluteExpToLS()
      router.push(RoutePath.LOGIN)
    }
  })
}

import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/api'

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApi.logout
  })
}

import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/api'

export const useVerifyAccountMutation = () => {
  return useMutation({
    mutationFn: authApi.verify
  })
}

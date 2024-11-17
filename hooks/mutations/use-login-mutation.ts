import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/api'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApi.login
  })
}

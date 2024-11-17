import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/api'

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApi.register
  })
}

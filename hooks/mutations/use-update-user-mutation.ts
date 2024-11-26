import { useMutation } from '@tanstack/react-query'

import { userApi } from '@/api'

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: userApi.update
  })
}

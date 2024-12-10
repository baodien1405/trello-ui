import { useMutation } from '@tanstack/react-query'

import { cardApi } from '@/api'

export const useUpdateCardMutation = () => {
  return useMutation({
    mutationFn: cardApi.update
  })
}

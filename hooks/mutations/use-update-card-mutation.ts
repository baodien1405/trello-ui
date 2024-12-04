import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cardApi } from '@/api'
import { QueryKeys } from '@/constants'

export const useUpdateCardMutation = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cardApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD_DETAILS, boardId], exact: true })
    }
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { columnApi } from '@/api'
import { QueryKeys } from '@/constants'

export const useAddColumnMutation = (boardId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: columnApi.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOARD_DETAILS, boardId], exact: true })
    }
  })
}

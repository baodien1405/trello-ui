import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardApi } from '@/api'
import { QueryKeys } from '@/constants'

export const useAddBoardMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: boardApi.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BOARD_LIST]
      })
    }
  })
}

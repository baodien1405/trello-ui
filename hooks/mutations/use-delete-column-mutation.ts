import { useMutation } from '@tanstack/react-query'

import { columnApi } from '@/api'

export const useDeleteColumnMutation = () => {
  return useMutation({
    mutationFn: columnApi.delete
  })
}

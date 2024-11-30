import { useMutation } from '@tanstack/react-query'

import { columnApi } from '@/api'

export const useUpdateColumnMutation = () => {
  return useMutation({
    mutationFn: columnApi.update
  })
}

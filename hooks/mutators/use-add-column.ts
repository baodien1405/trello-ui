import { columnApi } from '@/api'
import { ColumnPayload, SuccessResponse } from '@/models'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'

type UseAddColumnOptions = Omit<
  UseMutationOptions<SuccessResponse<any>>,
  'mutationKey' | 'mutationFn'
>

export const useAddColumn = (payload: ColumnPayload, options?: UseAddColumnOptions) => {
  return useMutation({
    ...options,
    mutationFn: () => columnApi.add(payload)
  })
}

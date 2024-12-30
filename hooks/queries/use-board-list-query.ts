import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { boardApi } from '@/api'
import { QueryKeys } from '@/constants'
import { Board, ListParams, ListResponse, SuccessResponse } from '@/models'

type UseBoardListQueryOptions = Omit<
  UseQueryOptions<SuccessResponse<ListResponse<Board>>>,
  'queryKey' | 'queryFn'
>

export const useBoardListQuery = (
  params: Partial<ListParams & { 'q[title]'?: string }>,
  options?: UseBoardListQueryOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.BOARD_LIST, params],
    queryFn: () => boardApi.getAll(params)
  })
}

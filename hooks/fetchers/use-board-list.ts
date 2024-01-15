import { boardApi } from '@/api'
import { QueryKeys } from '@/constants'
import { Board, ListParams, ListResponse, SuccessResponse } from '@/models'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseBoardListOptions = Omit<
  UseQueryOptions<SuccessResponse<ListResponse<Board>>>,
  'queryKey' | 'queryFn'
>

export const useBoardList = (params: Partial<ListParams>, options?: UseBoardListOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.BOARD_LIST, params],
    queryFn: () => boardApi.getAll(params)
  })
}

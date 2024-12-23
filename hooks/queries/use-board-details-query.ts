import { boardApi } from '@/api'
import { QueryKeys } from '@/constants'
import { Board, SuccessResponse } from '@/models'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseBoardDetailsOptionsQuery = Omit<
  UseQueryOptions<SuccessResponse<Board>>,
  'queryKey' | 'queryFn'
>

export const useBoardDetailsQuery = (boardId: string, options?: UseBoardDetailsOptionsQuery) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.BOARD_DETAILS, boardId],
    queryFn: () => boardApi.get(boardId),
    enabled: !!boardId
  })
}

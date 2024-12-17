import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { invitationApi } from '@/api'
import { QueryKeys } from '@/constants'
import { Invitation, ListResponse, SuccessResponse } from '@/models'

type UseInvitationListQueryOptions = Omit<
  UseQueryOptions<SuccessResponse<ListResponse<Invitation>>>,
  'queryKey' | 'queryFn'
>

export const useInvitationListQuery = (options?: UseInvitationListQueryOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.INVITATION_LIST],
    queryFn: () => invitationApi.getAll()
  })
}

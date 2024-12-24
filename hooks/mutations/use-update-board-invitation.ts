import { useMutation, useQueryClient } from '@tanstack/react-query'

import { invitationApi } from '@/api'
import { QueryKeys } from '@/constants'

export const useUpdateBoardInvitation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: invitationApi.updateBoardInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.INVITATION_LIST] })
    }
  })
}

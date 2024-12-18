import { useMutation } from '@tanstack/react-query'

import { invitationApi } from '@/api'

export const useUpdateBoardInvitation = () => {
  return useMutation({
    mutationFn: invitationApi.updateBoardInvitation
  })
}

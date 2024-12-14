import { useMutation } from '@tanstack/react-query'

import { invitationApi } from '@/api'

export const useInviteUserToBoard = () => {
  return useMutation({
    mutationFn: invitationApi.inviteUserToBoard
  })
}

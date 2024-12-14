import { ApiEndpoint } from '@/constants'
import { Board, Invitation, InviteUserToBoardPayload, SuccessResponse, User } from '@/models'
import axiosClient from './axios-client'

export const invitationApi = {
  inviteUserToBoard(
    payload: InviteUserToBoardPayload
  ): Promise<SuccessResponse<Invitation & { board: Board; inviter: User; invitee: User }>> {
    return axiosClient.post(ApiEndpoint.INVITATION_INVITE_USER_TO_BOARD, payload)
  }
}

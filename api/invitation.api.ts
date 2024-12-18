import { ApiEndpoint } from '@/constants'
import {
  Board,
  Invitation,
  InviteUserToBoardPayload,
  ListResponse,
  SuccessResponse,
  User
} from '@/models'
import axiosClient from './axios-client'

export const invitationApi = {
  getAll(): Promise<SuccessResponse<ListResponse<Invitation>>> {
    return axiosClient.get(ApiEndpoint.INVITATION_GET_LIST)
  },

  inviteUserToBoard(
    payload: InviteUserToBoardPayload
  ): Promise<SuccessResponse<Invitation & { board: Board; inviter: User; invitee: User }>> {
    return axiosClient.post(ApiEndpoint.INVITATION_INVITE_USER_TO_BOARD, payload)
  },

  updateBoardInvitation({
    notificationId,
    status
  }: {
    notificationId: string
    status: string
  }): Promise<SuccessResponse<Invitation>> {
    return axiosClient.put(
      ApiEndpoint.INVITATION_BOARD_UPDATE.replace('{notificationId}', notificationId),
      { status }
    )
  }
}

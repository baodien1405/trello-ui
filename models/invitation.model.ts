export interface InviteUserToBoardPayload {
  inviteeEmail: string
  boardId: string
}

export interface Invitation {
  inviterId: string
  inviteeId: string
  type: string
  boardInvitation?: {
    boardId: string
    status: string
  }
  createdAt?: string
  updatedAt?: string
  _destroy?: boolean
}

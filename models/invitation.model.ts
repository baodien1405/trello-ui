import { BOARD_INVITATION_STATUS } from '@/constants'
import { User } from '@/models/auth.model'
import { Board } from '@/models/board.model'

export interface InviteUserToBoardPayload {
  inviteeEmail: string
  boardId: string
}

export interface BoardInvitation {
  boardId: string
  status: keyof typeof BOARD_INVITATION_STATUS
}

export interface Invitation {
  _id: string
  inviterId: string
  inviteeId: string
  type: string
  boardInvitation: BoardInvitation
  createdAt: number
  updatedAt: number
  _destroy: boolean
  inviter: User
  invitee: User
  board: Board
}

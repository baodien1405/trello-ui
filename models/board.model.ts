import { Column, User } from '@/models'
import { UniqueIdentifier } from '@dnd-kit/core'

export interface Board {
  _id: string
  title: string
  description: string
  slug: string
  type: string
  columnOrderIds: string[]
  columns: Column[]
  owners: User[]
  members: User[]
  createdAt: number
  updatedAt: any
  _destroy: boolean
}

export interface MoveCardDiffColumnPayload {
  currentCardId: UniqueIdentifier
  prevColumnId: string
  prevCardOrderIds: string[]
  nextColumnId: string
  nextCardOrderIds: string[]
}

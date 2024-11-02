import { Column } from '@/models'
import { UniqueIdentifier } from '@dnd-kit/core'

export interface Board {
  _id: string
  title: string
  description: string
  slug: string
  columnOrderIds: string[]
  columns: Column[]
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

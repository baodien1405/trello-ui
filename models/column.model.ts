import { Card } from '@/models/card.model'

export interface Column {
  _id: string
  title: string
  cards: Card[]
  cardOrderIds: string[]
  boardId: string
}

export interface ColumnPayload {
  title: string
  boardId: string
}

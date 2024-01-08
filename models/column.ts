export interface Column {
  _id: string
  title: string
  cards: any[]
  cardOrderIds: string[]
  boardId: string
}

export interface ColumnPayload {
  title: string
  boardId: string
}

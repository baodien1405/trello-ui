export interface Card {
  _id: string
  boardId: string
  columnId: string
  title: string
  description?: string
}

export interface CardPayload {
  title: string
  boardId: string
  columnId: string
}

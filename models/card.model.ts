export interface Card {
  _id: string
  boardId: string
  columnId: string
  title: string
  description?: string
  cover: string | null
}

export interface CardPayload {
  title: string
  boardId: string
  columnId: string
}

export interface Comment {
  userAvatar?: string
  userDisplayName?: string
  content: string
  userId?: string
  userEmail?: string
  commentedAt?: string
}

export interface Card {
  _id: string
  boardId: string
  columnId: string
  title: string
  description?: string
  memberIds?: string[]
  cover: string | null
  comments?: Comment[]
}

export interface CardPayload {
  title: string
  boardId: string
  columnId: string
}

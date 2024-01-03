export interface Board {
  _id: string
  title: string
  description: string
  slug: string
  columnOrderIds: string[]
  createdAt: number
  updatedAt: any
  _destroy: boolean
}

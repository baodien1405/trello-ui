import { Column } from '@/models'

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

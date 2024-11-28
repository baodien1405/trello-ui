import { PaginationInterface } from '@/models'

export interface ListParams {
  page: number
  limit: number
}

export interface ListResponse<T> {
  results: Array<T>
  pagination: PaginationInterface
}

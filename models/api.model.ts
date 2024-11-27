export interface ListParams {
  page: number
  limit: number
}

export interface Pagination {
  page: number
  limit: number
  totalRows: number
}

export interface ListResponse<T> {
  results: Array<T>
  pagination: Pagination
}

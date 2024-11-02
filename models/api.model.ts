export interface ListParams {
  page: string | number
  limit: string | number
}

export interface Pagination {
  page: string
  limit: string
  totalRows: string
}

export interface ListResponse<T> {
  results: Array<T>
  pagination: Pagination
}

export interface PaginationInterface {
  page: number
  limit: number
  totalRows: number
}

export class Pagination implements PaginationInterface {
  page: number
  limit: number
  totalRows: number

  constructor(option: PaginationInterface = { page: 1, limit: 12, totalRows: 0 }) {
    this.page = option.page
    this.limit = option.limit
    this.totalRows = option.totalRows
  }
}

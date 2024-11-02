export interface IconProps {
  width?: string
  height?: string
  onClick?: () => void
}

export interface SuccessResponse<T> {
  message: string
  status: string
  code: number
  metadata: T
}

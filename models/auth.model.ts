export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  confirm_password: string
}

export interface VerifyPayload {
  email: string
  token: string
}

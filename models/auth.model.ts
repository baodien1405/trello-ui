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

export interface User {
  _id: string
  email: string
  username: string
  displayName: string
  verifyToken: string
  role: string
  avatar: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

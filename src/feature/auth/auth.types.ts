export type User = {
  id: string
  name: string
  email: string
  avatar: string | null
  isEmailVerified: boolean
  created: string
  updated: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type SignUpArgs = {
  name?: string
  email: string
  password: string
}

export type UpdateUserArgs = {
  name: string
  avatar?: string
}

export type RecoverPasswordArgs = {
  email: string
}

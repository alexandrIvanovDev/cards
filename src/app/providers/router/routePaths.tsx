export type Routes =
  | 'signIn'
  | 'signUp'
  | 'createNewPassword'
  | 'forgotPassword'
  | 'main'
  | 'profile'
  | 'packs'

export const routePaths: Record<Routes, string> = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  createNewPassword: '/create-new-password',
  forgotPassword: '/forgot-password',
  main: '/',
  profile: '/profile',
  packs: '/packs',
}

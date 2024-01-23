import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { routePaths } from './routePaths.tsx'

import { ErrorBoundary } from '@/app/providers/errorBoudary/error-boudary.tsx'
import { Layout } from '@/components/ui/layout/layout.tsx'
import { useMeQuery } from '@/feature/auth/auth.service.ts'
import { CheckEmail } from '@/pages/check-email/check-email.tsx'
import { CreateNewPasswordPage } from '@/pages/create-new-password/create-new-password-page.tsx'
import { Deck } from '@/pages/deck/deck.tsx'
import { DecksList } from '@/pages/decks-list/decks-list.tsx'
import { ForgotPasswordPage } from '@/pages/forgot-password/forgot-password-page.tsx'
import { ProfilePage } from '@/pages/personal-information/profile-page.tsx'
import { SignInPage } from '@/pages/sign-in/sign-in-page.tsx'
import { SignUpPage } from '@/pages/sign-up/sign-up-page.tsx'

const PrivateRoutes = () => {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return null

  const isAuth = data !== null

  return isAuth ? <Outlet /> : <Navigate to={routePaths.signIn} />
}

export const publicRoutes: RouteObject[] = [
  { path: routePaths.signIn, element: <SignInPage /> },
  { path: routePaths.signUp, element: <SignUpPage /> },
  { path: routePaths.createNewPassword, element: <CreateNewPasswordPage /> },
  { path: routePaths.forgotPassword, element: <ForgotPasswordPage /> },
  { path: `${routePaths.checkEmail}/:email`, element: <CheckEmail /> },
]

export const privateRoutes: RouteObject[] = [
  {
    path: routePaths.main,
    element: <Navigate to={routePaths.packs} />,
  },
  {
    path: routePaths.packs,
    element: <DecksList />,
  },
  {
    path: routePaths.profile,
    element: <ProfilePage />,
  },
  {
    path: routePaths.pack,
    element: <Deck />,
  },
]

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])

export const Router = () => <RouterProvider router={router} />

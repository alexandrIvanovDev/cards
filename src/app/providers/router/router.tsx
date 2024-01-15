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
import { CreateNewPasswordPage } from '@/pages/create-new-password/create-new-password-page.tsx'
import { Deck } from '@/pages/deck/deck.tsx'
import { ForgotPasswordPage } from '@/pages/forgot-password/forgot-password-page.tsx'
import { PacksList } from '@/pages/packs-list/packs-list.tsx'
import { ProfilePage } from '@/pages/personal-information/profile-page.tsx'
import { SignInPage } from '@/pages/sign-in/sign-in-page.tsx'
import { SignUpPage } from '@/pages/sign-up/sign-up-page.tsx'
import { useMeQuery } from '@/services/auth/auth.service.ts'

const PrivateRoutes = () => {
  const { isLoading, isError } = useMeQuery()

  if (isLoading) return null

  const isAuth = !isError

  return isAuth ? <Outlet /> : <Navigate to={routePaths.signIn} />
}

export const publicRoutes: RouteObject[] = [
  { path: routePaths.signIn, element: <SignInPage /> },
  { path: routePaths.signUp, element: <SignUpPage /> },
  { path: routePaths.createNewPassword, element: <CreateNewPasswordPage /> },
  { path: routePaths.forgotPassword, element: <ForgotPasswordPage /> },
]

export const privateRoutes: RouteObject[] = [
  {
    path: routePaths.packs,
    element: <PacksList />,
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
    path: routePaths.main,
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

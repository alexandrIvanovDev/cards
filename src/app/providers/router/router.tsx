import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { routePaths } from './routePaths.tsx'

import { ErrorBoundary } from '@/app/providers/errorBoudary'
import { Layout } from '@/components/ui/layout/layout.tsx'
import { useMeQuery } from '@/feature/auth/auth.service.ts'
import {
  CheckEmail,
  CreateNewPassword,
  Deck,
  DecksList,
  ForgotPassword,
  Learn,
  NotFound,
  PersonalInformation,
  SignIn,
  SignUp,
} from '@/pages'

const PrivateRoutes = () => {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return null

  const isAuth = data !== null

  return isAuth ? <Outlet /> : <Navigate to={routePaths.signIn} />
}

export const publicRoutes: RouteObject[] = [
  { path: routePaths.signIn, element: <SignIn /> },
  { path: routePaths.signUp, element: <SignUp /> },
  { path: `${routePaths.createNewPassword}/:token`, element: <CreateNewPassword /> },
  { path: routePaths.forgotPassword, element: <ForgotPassword /> },
  { path: `${routePaths.checkEmail}/:email`, element: <CheckEmail /> },
  { path: routePaths.notFound, element: <NotFound /> },
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
    element: <PersonalInformation />,
  },
  {
    path: routePaths.pack,
    element: <Deck />,
  },
  {
    path: `${routePaths.learn}/:id`,
    element: <Learn />,
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

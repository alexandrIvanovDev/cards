import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { routePaths } from './routePaths.tsx'

import { Layout } from '@/Layout.tsx'
import { CreateNewPasswordPage } from '@/pages/create-new-password/create-new-password-page.tsx'
import { ForgotPasswordPage } from '@/pages/forgot-password/forgot-password-page.tsx'
import { SignInPage } from '@/pages/sign-in/sign-in-page.tsx'
import { SignUpPage } from '@/pages/sign-up/sign-up-page.tsx'

const PrivateRoutes = () => {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to={routePaths.signIn} />
}

export const publicRoutes: RouteObject[] = [
  { path: routePaths.signIn, element: <SignInPage /> },
  { path: routePaths.signUp, element: <SignUpPage /> },
  { path: routePaths.createNewPassword, element: <CreateNewPasswordPage /> },
  { path: routePaths.forgotPassword, element: <ForgotPasswordPage /> },
]

export const privateRoutes: RouteObject[] = [{ path: '/', element: <div>Main</div> }]

const router = createBrowserRouter([
  {
    element: <Layout />,
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

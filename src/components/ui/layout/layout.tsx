import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { routePaths } from '@/app/providers/router'
import { Header } from '@/components/ui/header'
import { useMeQuery } from '@/feature/auth/auth.service.ts'

export const Layout = () => {
  const { data: myData } = useMeQuery()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const data = myData
    ? {
        name: myData.name,
        email: myData.email,
        avatar: myData.avatar,
      }
    : null

  if (pathname === routePaths.main) {
    navigate(routePaths.packs)
  }

  return (
    <>
      <Header data={data} />
      <Outlet />
    </>
  )
}

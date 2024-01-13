import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header'
import { useMeQuery } from '@/services/auth/auth.service.ts'

export const Layout = () => {
  const { data: myData } = useMeQuery()

  const data = myData
    ? {
        name: myData.name,
        email: myData.email,
        avatar: myData.avatar,
      }
    : null

  return (
    <>
      <Header data={data} />
      <Outlet />
    </>
  )
}

import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header'
import { Toast } from '@/components/ui/toast'
import { useMeQuery } from '@/feature/auth/serivices/auth.service.ts'

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
      <Toast />
    </>
  )
}

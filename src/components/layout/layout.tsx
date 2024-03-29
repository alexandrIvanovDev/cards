import { Outlet } from 'react-router-dom'

import { Header } from '../header'

import s from './layout.module.scss'

import { LangSwitcher } from '@/components/ui/lang-switcher'
import { Toast } from '@/components/ui/toast'
import { useMeQuery } from '@/feature/auth/serivices'

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
      <LangSwitcher className={s.langSwitcher} />
      <Outlet />
      <Toast />
    </>
  )
}

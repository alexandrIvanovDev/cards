import { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { useTheme } from '@/common/hooks/use-theme.ts'
import { Header } from '@/components/ui/header'
import { LangSwitcher } from '@/components/ui/lang-switcher'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Toast } from '@/components/ui/toast'
import { useMeQuery } from '@/feature/auth/serivices'

export const Layout = () => {
  const { data: myData } = useMeQuery()

  const { theme } = useTheme()

  const data = myData
    ? {
        name: myData.name,
        email: myData.email,
        avatar: myData.avatar,
      }
    : null

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <Header data={data} />
      <LangSwitcher className={s.langSwitcher} />
      <ThemeSwitcher className={s.themeSwitcher} />
      <Outlet />
      <Toast />
    </>
  )
}

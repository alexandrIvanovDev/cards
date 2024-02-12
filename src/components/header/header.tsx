import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './header.module.scss'
import { ProfileInfo, ProfileInfoProps } from './profile-info/profile-info.tsx'

import { routePaths } from '@/app/providers/router'
import { Logo } from '@/assets/icons/Logo.tsx'
import { LogoutIcon } from '@/assets/icons/Logout.tsx'
import { ProfileIcon } from '@/assets/icons/Profile.tsx'
import { useAppSelector } from '@/common/hooks/use-app-selector.ts'
import { useTheme } from '@/common/hooks/use-theme.ts'
import { requestHandler } from '@/common/utils/requestHandler.ts'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dropdown, DropDownItem, DropDownItemWithIcon } from '@/components/ui/dropdown'
import { ProgressBar } from '@/components/ui/progress-bar'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Typography } from '@/components/ui/typography'
import { useSignOutMutation } from '@/feature/auth/serivices'

type Props = { data: ProfileInfoProps | null }

export const Header = ({ data }: Props) => {
  const isLoading = useAppSelector(state => state.loading.isLoading)

  const [signOut] = useSignOutMutation()

  const navigate = useNavigate()

  const { theme } = useTheme()

  const { t } = useTranslation()

  const logout = async () => {
    await requestHandler(async () => {
      await signOut().unwrap()
      toast(t('You have successfully logged out'))

      return <Navigate to={routePaths.signIn} />
    })
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <header className={s.header}>
      {isLoading && <ProgressBar />}
      <div className={s.container}>
        <Button as={Link} to={routePaths.packs} variant="link">
          <Logo className={s.logo} />
        </Button>
        {data ? (
          <div className={s.data}>
            <span className={s.name}>{data?.name}</span>
            <Dropdown
              trigger={
                <button>
                  <Avatar userName={data.name} img={data?.avatar ?? ''} className={s.avatar} />
                </button>
              }
            >
              <div>
                <DropDownItem>
                  <ProfileInfo name={data.name} email={data.email} avatar={data?.avatar} />
                </DropDownItem>
                <DropDownItemWithIcon
                  icon={<ProfileIcon />}
                  text={t('My profile')}
                  onSelect={() => navigate(routePaths.profile)}
                />
                <DropDownItem>
                  <ThemeSwitcher />
                </DropDownItem>
                <DropDownItemWithIcon
                  icon={<LogoutIcon />}
                  text={t('Sign out')}
                  onSelect={logout}
                />
              </div>
            </Dropdown>
          </div>
        ) : (
          <Button as={Link} to={routePaths.signIn} className={s.btn}>
            <Typography variant={'subtitle2'} as={'span'}>
              {t('Sign In')}
            </Typography>
          </Button>
        )}
      </div>
    </header>
  )
}

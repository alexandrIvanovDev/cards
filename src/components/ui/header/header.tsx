import { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import s from './header.module.scss'
import { ProfileInfo, ProfileInfoProps } from './profile-info/profile-info.tsx'

import { routePaths } from '@/app/providers/router'
import { Logo } from '@/assets/icons/Logo.tsx'
import { LogoutIcon } from '@/assets/icons/Logout.tsx'
import { ProfileIcon } from '@/assets/icons/Profile.tsx'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dropdown, DropDownItem, DropDownItemWithIcon } from '@/components/ui/dropdown'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useSignOutMutation } from '@/feature/auth/auth.service.ts'

type Props = {
  data: ProfileInfoProps | null
}

export const Header: FC<Props> = ({ data }) => {
  const navigate = useNavigate()

  const [signOut, { isLoading }] = useSignOutMutation()

  const logout = async () => {
    try {
      await signOut()
      navigate(routePaths.signIn)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <header className={s.wrapper}>
      {isLoading && <ProgressBar />}
      <div className={s.container}>
        <Button as={Link} to={routePaths.packs} variant="link">
          <Logo />
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
                  text={'My profile'}
                  onSelect={() => navigate(routePaths.profile)}
                />
                <DropDownItemWithIcon icon={<LogoutIcon />} text={'Sign out'} onSelect={logout} />
              </div>
            </Dropdown>
          </div>
        ) : (
          <Button as={Link} to={routePaths.signIn} variant={'secondary'} className={s.btn}>
            <Typography variant={'subtitle2'} as={'span'}>
              Sign In
            </Typography>
          </Button>
        )}
      </div>
    </header>
  )
}

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

type Props = {
  data: ProfileInfoProps | null
}

export const Header: FC<Props> = ({ data }) => {
  const navigate = useNavigate()

  return (
    <header className={s.wrapper}>
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
                <DropDownItemWithIcon icon={<LogoutIcon />} text={'Sign out'} />
              </div>
            </Dropdown>
          </div>
        ) : (
          <Button as={Link} to={routePaths.signIn} variant={'primary'} className={s.btn}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}

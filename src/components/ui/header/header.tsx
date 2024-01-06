import { FC } from 'react'

import s from './header.module.scss'

import { Logo } from '@/assets/icons/Logo.tsx'
import { LogoutIcon } from '@/assets/icons/Logout.tsx'
import { ProfileIcon } from '@/assets/icons/Profile.tsx'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dropdown, DropDownItem, DropDownItemWithIcon } from '@/components/ui/dropdown'
import { ProfileInfo, ProfileInfoProps } from '@/components/ui/header/profile-info/profile-info.tsx'

type Props = {
  data: ProfileInfoProps | null
}

export const Header: FC<Props> = ({ data }) => {
  return (
    <header className={s.wrapper}>
      <div className={s.container}>
        <Logo />
        {data ? (
          <div className={s.data}>
            <span className={s.name}>{data.name}</span>
            <Dropdown
              trigger={
                <button>
                  <Avatar userName={data.name} img={data.avatar} className={s.avatar} />
                </button>
              }
            >
              <div>
                <DropDownItem>
                  <ProfileInfo name={data.name} email={data.email} avatar={data.avatar} />
                </DropDownItem>
                <DropDownItemWithIcon icon={<ProfileIcon />} text={'My profile'} />
                <DropDownItemWithIcon icon={<LogoutIcon />} text={'Sign out'} />
              </div>
            </Dropdown>
          </div>
        ) : (
          <Button as={'a'} variant={'primary'}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}

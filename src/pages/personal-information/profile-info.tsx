import { FC } from 'react'

import s from './profile-info.module.scss'

import { EditIcon } from '@/assets/icons/Edit.tsx'
import { LogoutIcon } from '@/assets/icons/Logout.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { User } from '@/feature/auth/auth.types.ts'

type ProfileInfoProps = {
  user: User
  changeName: () => void
  logout: () => void
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ changeName, user, logout }) => {
  return (
    <div className={s.information}>
      <Typography variant="h1" as="h3" className={s.name}>
        {user.name} <EditIcon className={s.editIcon} onClick={changeName} />
      </Typography>
      <Typography variant="body2" className={s.email}>
        {user.email}
      </Typography>
      <Button variant="secondary" onClick={logout}>
        <LogoutIcon className={s.logoutIcon} />
        <Typography variant={'subtitle2'}>Logout</Typography>
      </Button>
    </div>
  )
}

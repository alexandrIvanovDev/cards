import { FC } from 'react'

import s from './profile-info.module.scss'
import { ProfileInfoDataType } from './profile-page.tsx'

import { EditIcon } from '@/assets/icons/Edit.tsx'
import { LogoutIcon } from '@/assets/icons/Logout.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type ProfileInfoProps = {
  changeName: () => void
} & Omit<ProfileInfoDataType, 'avatar'>

export const ProfileInfo: FC<ProfileInfoProps> = ({ changeName, name, email }) => {
  return (
    <div className={s.information}>
      <Typography variant="h1" as="h3" className={s.name}>
        {name} <EditIcon className={s.editIcon} onClick={changeName} />
      </Typography>
      <Typography variant="body2" className={s.email}>
        {email}
      </Typography>
      <Button variant="secondary">
        <LogoutIcon className={s.logoutIcon} /> Logout
      </Button>
    </div>
  )
}

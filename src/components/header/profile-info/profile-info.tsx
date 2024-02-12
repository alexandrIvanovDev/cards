import { FC } from 'react'

import s from './profile-info.module.scss'

import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

export type ProfileInfoProps = {
  name: string
  email: string
  avatar: string | null
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ name, email, avatar }) => {
  return (
    <div className={s.wrapper}>
      <Avatar userName={name} img={avatar ?? ''} />
      <div className={s.information}>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="caption" className={s.email}>
          {email}
        </Typography>
      </div>
    </div>
  )
}

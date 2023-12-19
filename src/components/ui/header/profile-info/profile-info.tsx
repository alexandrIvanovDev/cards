import { FC } from 'react'

import s from './profile-info.module.scss'

import { Avatar } from '@/components/ui/avatar'

type Props = {
  name: string
  email: string
  avatar: string
}

export const ProfileInfo: FC<Props> = ({ name, email, avatar }) => {
  return (
    <div className={s.wrapper}>
      <Avatar userName={name} img={avatar} />
      <div className={s.information}>
        <span>{name}</span>
        <span className={s.email}>{email}</span>
      </div>
    </div>
  )
}

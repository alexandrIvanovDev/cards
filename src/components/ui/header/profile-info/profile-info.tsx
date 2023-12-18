import { FC } from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

type Props = {
  name: string
  email: string
  avatar: string
}

export const ProfileInfo: FC<Props> = ({ name, email, avatar }) => {
  return (
    <div>
      <Avatar userName={name} img={avatar} />
      <div>
        <Typography>{name}</Typography>
        <Typography>{email}</Typography>
      </div>
    </div>
  )
}

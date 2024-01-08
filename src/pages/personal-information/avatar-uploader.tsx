import { FC } from 'react'

import s from './avatar-uploader.module.scss'

import { EditIcon } from '@/assets/icons/Edit.tsx'
import { Avatar, AvatarProps } from '@/components/ui/avatar'

export const AvatarUploader: FC<AvatarProps> = props => {
  const loadNewImg = () => {}

  return (
    <div className={s.wrapper}>
      <Avatar {...props} />
      <div className={s.iconWrapper}>
        <EditIcon className={s.icon} onClick={loadNewImg} />
      </div>
    </div>
  )
}

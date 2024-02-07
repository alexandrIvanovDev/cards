import s from './avatar-uploader.module.scss'

import { EditIcon } from '@/assets/icons/Edit.tsx'
import { Avatar, AvatarProps } from '@/components/ui/avatar'
import { Uploader } from '@/components/ui/uploader'

type Props = {
  editMode: boolean
  changeAvatar: (file: File) => void
} & AvatarProps

export const AvatarUploader = ({ editMode, changeAvatar, ...rest }: Props) => {
  return (
    <div className={s.wrapper}>
      <Avatar size={'large'} {...rest} />
      {!editMode && (
        <div className={s.iconWrapper}>
          <Uploader className={s.uploader} loadFile={changeAvatar}>
            <EditIcon className={s.icon} />
          </Uploader>
        </div>
      )}
    </div>
  )
}

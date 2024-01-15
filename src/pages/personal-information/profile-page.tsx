import { useState } from 'react'

import s from './profile-page.module.scss'

import { EditProfileForm } from '@/components/auth/edit-profile'
import { AvatarProps } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { AvatarUploader } from '@/pages/personal-information/avatar-uploader.tsx'
import { ProfileInfo } from '@/pages/personal-information/profile-info.tsx'
import { useMeQuery } from '@/services/auth/auth.service.ts'
import { User } from '@/services/auth/auth.types.ts'

export type ProfileInfoDataType = {
  name: string
  email: string
  avatar?: string
}

// type Props = {
//   data: ProfileInfoDataType
// }

const userData: Pick<AvatarProps, 'userName' | 'img'> = {
  userName: 'Alex',
  img: '',
}

export const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false)
  const { data } = useMeQuery()

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const saveChanges = () => {
    toggleEditMode()
  }

  return (
    <Card className={s.wrapper}>
      <Typography as="h2" variant="large">
        Personal Information
      </Typography>
      <AvatarUploader
        img={userData.img}
        userName={userData.userName}
        size="large"
        className={s.avatar}
        editMode={editMode}
      />
      {editMode ? (
        <EditProfileForm onSubmit={saveChanges} />
      ) : (
        <ProfileInfo user={data as User} changeName={toggleEditMode} />
      )}
    </Card>
  )
}

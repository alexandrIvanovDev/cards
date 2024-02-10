import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

import s from './profile.module.scss'

import { routePaths } from '@/app/providers/router'
import { EditProfileForm } from '@/components/forms/edit-profile'
import { BackButton } from '@/components/ui/back-button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/feature/auth/serivices'
import { useProfile } from '@/feature/profile/model/hooks'
import { AvatarUploader } from '@/feature/profile/ui/avatar-uploader'
import { ProfileInfo } from '@/feature/profile/ui/profile-info'

export const Profile = () => {
  const { editMode, toggleEditMode, logout, changeAvatar, changeUserData } = useProfile()

  const { data } = useMeQuery()

  const { t } = useTranslation()

  const signOut = async () => {
    await logout()

    return <Navigate to={routePaths.signIn} />
  }

  const avatar = data?.avatar as string

  const userData = {
    name: data?.name as string,
    email: data?.email as string,
  }

  return (
    <div className={s.content}>
      <BackButton className={s.backBtn} />

      <Card className={s.wrapper}>
        <Typography as="h2" variant="large">
          {t('Personal Information')}
        </Typography>
        <AvatarUploader
          img={avatar}
          userName={userData.name}
          className={s.avatar}
          editMode={editMode}
          changeAvatar={changeAvatar}
        />

        {editMode ? (
          <EditProfileForm
            onSubmit={changeUserData}
            name={userData.name}
            toggleEditMode={toggleEditMode}
            avatar={avatar}
          />
        ) : (
          <ProfileInfo user={userData} changeName={toggleEditMode} logout={signOut} />
        )}
      </Card>
    </div>
  )
}

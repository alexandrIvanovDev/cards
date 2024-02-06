import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './personal-information.module.scss'

import { routePaths } from '@/app/providers/router'
import { notificationHandler } from '@/common/utils/notification-handler.ts'
import { requestHandler } from '@/common/utils/requestHandler.ts'
import { EditProfileForm } from '@/components/forms/edit-profile'
import { BackButton } from '@/components/ui/back-button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import {
  useMeQuery,
  useSignOutMutation,
  useUpdateUserMutation,
} from '@/feature/auth/auth.service.ts'
import { UpdateUserArgs } from '@/feature/auth/auth.types.ts'
import { AvatarUploader } from '@/feature/profile/avatar-uploader'
import { ProfileInfo } from '@/feature/profile/profile-info'

export const PersonalInformation = () => {
  const [editMode, setEditMode] = useState(false)

  const { data, isLoading: getUserIsLoading } = useMeQuery()

  const { t } = useTranslation()

  const [updateUser, { isLoading: updateUserIsLoading }] = useUpdateUserMutation()
  const [signOut, { isLoading: signOutIsLoading }] = useSignOutMutation()

  const logout = async () => {
    await requestHandler(async () => {
      await signOut().unwrap()
      toast(t('You have successfully logged out'))

      return <Navigate to={routePaths.signIn} />
    })
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const changeUserName = async (data: UpdateUserArgs) => {
    const formData = new FormData()

    formData.append('name', data.name)

    await requestHandler(async () => {
      await updateUser(formData).unwrap()
      toast.success(t('Your name has been successfully changed'))
      toggleEditMode()
    })
  }

  const loadNewImg = async (file: File) => {
    try {
      const formData = new FormData()

      formData.append('avatar', file)

      await updateUser(formData).unwrap()
      toast.success(t('Your avatar has been successfully changed'))
    } catch (e) {
      notificationHandler(e)
    }
  }

  const userData = {
    name: data?.name as string,
    email: data?.email as string,
  }

  const isLoading = getUserIsLoading || updateUserIsLoading || signOutIsLoading

  return (
    <div className={s.content}>
      {isLoading && <ProgressBar />}
      <BackButton className={s.backBtn} />
      <Card className={s.wrapper}>
        <Typography as="h2" variant="large">
          {t('Personal Information')}
        </Typography>
        <AvatarUploader
          img={data?.avatar as string}
          userName={userData.name}
          className={s.avatar}
          editMode={editMode}
          loadNewImg={loadNewImg}
        />
        {editMode ? (
          <EditProfileForm
            onSubmit={changeUserName}
            name={userData.name}
            toggleEditMode={toggleEditMode}
          />
        ) : (
          <ProfileInfo user={userData} changeName={toggleEditMode} logout={logout} />
        )}
      </Card>
    </div>
  )
}

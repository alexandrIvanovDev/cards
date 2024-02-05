import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

import s from './personal-information.module.scss'

import { routePaths } from '@/app/providers/router'
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
    try {
      await signOut()

      return <Navigate to={routePaths.signIn} />
    } catch (e) {
      console.error(e)
    }
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const saveChanges = async (data: UpdateUserArgs) => {
    const formData = new FormData()

    formData.append('name', data.name)

    await updateUser(formData)
    toggleEditMode()
  }

  const loadNewImg = async (file: File) => {
    const formData = new FormData()

    formData.append('avatar', file)

    await updateUser(formData)
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
            onSubmit={saveChanges}
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

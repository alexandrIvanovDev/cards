import { useState } from 'react'

import { Navigate } from 'react-router-dom'

import s from './profile-page.module.scss'

import { routePaths } from '@/app/providers/router'
import { EditProfileForm } from '@/components/auth/edit-profile'
import { BackButton } from '@/components/ui/back-button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import {
  useMeQuery,
  useSignOutMutation,
  useUpdateUserMutation,
} from '@/feature/auth/auth.service.ts'
import { UpdateUserArgs, User } from '@/feature/auth/auth.types.ts'
import { AvatarUploader } from '@/pages/personal-information/avatar-uploader.tsx'
import { ProfileInfo } from '@/pages/personal-information/profile-info.tsx'

export const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false)
  const { data } = useMeQuery()
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
    await updateUser(data)
    toggleEditMode()
  }

  return (
    <div className={s.content}>
      {(updateUserIsLoading || signOutIsLoading) && <ProgressBar />}
      <BackButton className={s.backBtn} />
      <Card className={s.wrapper}>
        <Typography as="h2" variant="large">
          Personal Information
        </Typography>
        <AvatarUploader
          img={data?.avatar as string}
          userName={data?.name as string}
          size="large"
          className={s.avatar}
          editMode={editMode}
        />
        {editMode ? (
          <EditProfileForm
            onSubmit={saveChanges}
            name={data?.name as string}
            toggleEditMode={toggleEditMode}
          />
        ) : (
          <ProfileInfo user={data as User} changeName={toggleEditMode} logout={logout} />
        )}
      </Card>
    </div>
  )
}

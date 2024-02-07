import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { notificationHandler } from '@/common/utils/notification-handler.ts'
import { requestHandler } from '@/common/utils/requestHandler.ts'
import { UpdateUserArgs, useSignOutMutation, useUpdateUserMutation } from '@/feature/auth'

export const useProfile = () => {
  const [editMode, setEditMode] = useState(false)

  const { t } = useTranslation()

  const [updateUser] = useUpdateUserMutation()
  const [signOut] = useSignOutMutation()

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const logout = async () => {
    await requestHandler(async () => {
      await signOut().unwrap()
      toast(t('You have successfully logged out'))
    })
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

  const changeAvatar = async (file: File) => {
    try {
      const formData = new FormData()

      formData.append('avatar', file)

      await updateUser(formData).unwrap()
      toast.success(t('Your avatar has been successfully changed'))
    } catch (e) {
      notificationHandler(e)
    }
  }

  return { editMode, toggleEditMode, changeAvatar, changeUserName, logout }
}

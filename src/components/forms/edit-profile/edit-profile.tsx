import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import s from './edit-profile.module.scss'
import { useEditProfile } from './use-edit-profile.ts'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { UpdateUserArgs } from '@/feature/auth/serivices'

type Props = {
  name: string
  avatar?: string
  onSubmit: (data: UpdateUserArgs, isAvatarDeleted?: boolean) => void
  toggleEditMode: () => void
}

export const EditProfileForm = ({ onSubmit, name, toggleEditMode, avatar }: Props) => {
  const { control, handleSubmit, errors } = useEditProfile(name)

  const { t } = useTranslation()

  const [photoWillBeDeleted, setPhotoWillBeDeleted] = useState(false)

  const changeData = (date: UpdateUserArgs) => {
    onSubmit(date, photoWillBeDeleted)
  }

  useEffect(() => {
    if (photoWillBeDeleted) {
      toast.info(t('Click Save Changes and photo will be deleted'))
    }
  }, [photoWillBeDeleted])

  return (
    <form onSubmit={handleSubmit(changeData)} className={s.form}>
      <ControlledTextField
        name={'name'}
        control={control}
        error={errors.name?.message}
        label={t('Name')}
      />

      {avatar && (
        <Button variant={'tertiary'} type={'button'} onClick={() => setPhotoWillBeDeleted(true)}>
          <Typography variant={'subtitle2'}>{t('Delete profile photo')}</Typography>
        </Button>
      )}

      <div className={s.buttons}>
        <Button>
          <Typography variant={'subtitle2'}>{t('Save Changes')}</Typography>
        </Button>

        <Button variant={'secondary'} type={'button'} onClick={toggleEditMode}>
          <Typography variant={'subtitle2'}>{t('Back')}</Typography>
        </Button>
      </div>
    </form>
  )
}

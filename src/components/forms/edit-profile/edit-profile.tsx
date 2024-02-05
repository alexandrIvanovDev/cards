import { useTranslation } from 'react-i18next'

import s from './edit-profile.module.scss'
import { UpdateUserFormType, useEditProfile } from './use-edit-profile.ts'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  name: string
  onSubmit: (data: UpdateUserFormType) => void
  toggleEditMode: () => void
}

export const EditProfileForm = ({ onSubmit, name, toggleEditMode }: Props) => {
  const { control, handleSubmit, errors } = useEditProfile(name)

  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'name'}
        control={control}
        error={errors.name?.message}
        label={t('Name')}
      />
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

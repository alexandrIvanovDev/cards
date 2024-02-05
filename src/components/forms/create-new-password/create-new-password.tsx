import { useTranslation } from 'react-i18next'

import s from './create-new-password.module.scss'
import { CreateNewPasswordFormType, useCreateNewPassword } from './use-create-new-password.ts'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: CreateNewPasswordFormType) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit, errors } = useCreateNewPassword()

  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'password'}
        type="password"
        control={control}
        error={errors.password?.message}
        label={t('Password')}
        className={s.password}
      />
      <Typography className={s.text} variant={'body2'}>
        {t('Create new password and we will send you further instructions to email')}
      </Typography>
      <Button className={s.btn}>
        <Typography variant={'subtitle2'} as={'span'}>
          {t('Create New Password')}
        </Typography>
      </Button>
    </form>
  )
}

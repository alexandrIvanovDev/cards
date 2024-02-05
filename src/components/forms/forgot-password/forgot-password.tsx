import { useTranslation } from 'react-i18next'

import s from './forgot-password.module.scss'
import { ForgotPasswordFormType, useForgotPassword } from './use-forgot-password.ts'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: ForgotPasswordFormType) => void
}

export const ForgotPasswordForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit, errors } = useForgotPassword()

  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'email'}
        control={control}
        error={errors.email?.message}
        label={t('Email')}
      />
      <Typography className={s.text} variant={'body2'}>
        {t('Enter your email address and we will send you further instructions')}
      </Typography>
      <Button className={s.btn}>
        <Typography variant={'subtitle2'} as={'span'}>
          {t('Send Instructions')}
        </Typography>
      </Button>
    </form>
  )
}

import { useTranslation } from 'react-i18next'

import s from './sign-up.module.scss'
import { SignUpFormType, useSignUp } from './use-sign-up.ts'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: SignUpFormType) => void
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit, errors } = useSignUp()

  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'name'}
        control={control}
        error={errors.name?.message}
        label={t('Name')}
      />
      <ControlledTextField
        name={'email'}
        control={control}
        error={errors.email?.message}
        label={t('Email')}
      />
      <ControlledTextField
        name={'password'}
        type="password"
        control={control}
        error={errors.password?.message}
        label={t('Password')}
      />
      <ControlledTextField
        name={'confirmPassword'}
        type="password"
        control={control}
        error={errors.confirmPassword?.message}
        label={t('Confirm Password')}
      />
      <Button className={s.btn}>
        <Typography variant={'subtitle2'} as={'span'}>
          {t('Sign Up')}
        </Typography>
      </Button>
    </form>
  )
}

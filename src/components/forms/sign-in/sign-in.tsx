import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import s from './sign-in.module.scss'
import { SignInFormType, useSignIn } from './use-sign-in.ts'

import { routePaths } from '@/app/providers/router'
import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: SignInFormType) => void
}

export const SignInForm = ({ onSubmit }: Props) => {
  const { handleSubmit, control, errors } = useSignIn()

  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
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
      <ControlledCheckbox
        name={'rememberMe'}
        control={control}
        label={t('Remember me')}
        className={s.checkbox}
      />
      <Typography
        variant="link1"
        className={s.forgotPassword}
        as={Link}
        to={routePaths.forgotPassword}
      >
        {t('Forgot Password?')}
      </Typography>
      <Button>
        <Typography variant={'subtitle2'} as={'span'}>
          {t('Sign In')}
        </Typography>
      </Button>
    </form>
  )
}

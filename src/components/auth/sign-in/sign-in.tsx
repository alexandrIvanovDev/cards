import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './sign-in.module.scss'
import { SignInFormType, useSignIn } from './use-sign-in.tsx'

import { routePaths } from '@/app/providers/router'
import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: SignInFormType) => void
}

export const SignInForm: FC<Props> = ({ onSubmit }) => {
  const { handleSubmit, control, errors } = useSignIn()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'email'}
        control={control}
        error={errors.email?.message}
        label="Email"
      />
      <ControlledTextField
        name={'password'}
        type="password"
        control={control}
        error={errors.password?.message}
        label="Password"
      />
      <ControlledCheckbox
        name={'rememberMe'}
        control={control}
        label="Remember me"
        className={s.checkbox}
      />
      <Typography
        variant="link1"
        className={s.forgotPassword}
        as={Link}
        to={routePaths.forgotPassword}
      >
        Forgot Password?
      </Typography>
      <Button>
        <Typography variant={'subtitle2'} as={'span'}>
          Sign In
        </Typography>
      </Button>
    </form>
  )
}

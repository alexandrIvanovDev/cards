import { FC } from 'react'

import s from './sign-up.module.scss'
import { SignUpFormType, useSignUp } from './use-sign-up.ts'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: SignUpFormType) => void
}

export const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useSignUp()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'name'}
        control={control}
        error={errors.name?.message}
        label="Name"
      />

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
      <ControlledTextField
        name={'confirmPassword'}
        type="password"
        control={control}
        error={errors.confirmPassword?.message}
        label="Confirm Password"
      />
      <Button className={s.btn}>
        <Typography variant={'subtitle2'} as={'span'}>
          Sign Up
        </Typography>
      </Button>
    </form>
  )
}

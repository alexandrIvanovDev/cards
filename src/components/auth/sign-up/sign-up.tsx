import { FC } from 'react'

import { DevTool } from '@hookform/devtools'

import s from './sign-up.module.scss'
import { SignUpFormType, useSignUp } from './use-sign-up.tsx'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'

type Props = {
  onSubmit: (data: SignUpFormType) => void
}

export const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useSignUp()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <DevTool control={control} />

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
        label="Password"
      />
      <Button className={s.btn}>Sign Up</Button>
    </form>
  )
}

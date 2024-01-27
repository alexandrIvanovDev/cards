import { FC } from 'react'

import s from './forgot-password.module.scss'
import { ForgotPasswordFormType, useForgotPassword } from './use-forgot-password.tsx'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: ForgotPasswordFormType) => void
}

export const ForgotPasswordForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useForgotPassword()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'email'}
        control={control}
        error={errors.email?.message}
        label="Email"
      />
      <Typography className={s.text}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button className={s.btn}>Send Instructions</Button>
    </form>
  )
}

import { FC } from 'react'

import { DevTool } from '@hookform/devtools'

import s from './create-new-password.module.scss'
import { useCreateNewPassword, CreateNewPasswordFormType } from './use-create-new-password.tsx'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  onSubmit: (data: CreateNewPasswordFormType) => void
}

export const CreateNewPasswordForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useCreateNewPassword()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <DevTool control={control} />

      <ControlledTextField
        name={'password'}
        type="password"
        control={control}
        error={errors.password?.message}
        label="Password"
        className={s.password}
      />
      <Typography className={s.text}>
        Create new password and we will send you further instructions to email
      </Typography>
      <Button className={s.btn}>Create New Password</Button>
    </form>
  )
}

import { FC } from 'react'

import { DevTool } from '@hookform/devtools'

import s from './edit-profile.module.scss'
import { NickNameFormType, useEditProfile } from './use-edit-profile.tsx'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'

type Props = {
  onSubmit: (data: NickNameFormType) => void
}

export const EditProfileForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useEditProfile()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <DevTool control={control} />

      <ControlledTextField
        name={'nickName'}
        control={control}
        error={errors.nickName?.message}
        label="Nickname"
      />
      <Button className={s.btn}>Save changes</Button>
    </form>
  )
}

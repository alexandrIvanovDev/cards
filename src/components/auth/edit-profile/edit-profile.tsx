import { FC } from 'react'

import s from './edit-profile.module.scss'
import { UpdateUserFormType, useEditProfile } from './use-edit-profile.tsx'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  name: string
  onSubmit: (data: UpdateUserFormType) => void
}

export const EditProfileForm: FC<Props> = ({ onSubmit, name }) => {
  const { control, handleSubmit, errors } = useEditProfile(name)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'name'}
        control={control}
        error={errors.name?.message}
        label="Nickname"
      />
      <Button className={s.btn}>
        <Typography variant={'subtitle2'} as={'span'}>
          Save changes
        </Typography>
      </Button>
    </form>
  )
}

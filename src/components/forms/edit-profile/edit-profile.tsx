import s from './edit-profile.module.scss'
import { UpdateUserFormType, useEditProfile } from './use-edit-profile.ts'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  name: string
  onSubmit: (data: UpdateUserFormType) => void
  toggleEditMode: () => void
}

export const EditProfileForm = ({ onSubmit, name, toggleEditMode }: Props) => {
  const { control, handleSubmit, errors } = useEditProfile(name)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        name={'name'}
        control={control}
        error={errors.name?.message}
        label="Nickname"
      />
      <div className={s.buttons}>
        <Button fullWidth variant={'secondary'} type={'button'} onClick={toggleEditMode}>
          <Typography variant={'subtitle2'}>Back</Typography>
        </Button>
        <Button fullWidth>
          <Typography variant={'subtitle2'}>Save changes</Typography>
        </Button>
      </div>
    </form>
  )
}

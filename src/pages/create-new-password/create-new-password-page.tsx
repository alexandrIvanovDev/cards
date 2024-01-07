import s from './create-new-password-page.module.scss'

import { CreateNewPasswordForm } from '@/components/auth/create-new-password'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const CreateNewPasswordPage = () => {
  const onSubmit = () => {}

  return (
    <Card className={s.wrapper}>
      <Typography as="h2" variant="large">
        Create new password
      </Typography>
      <CreateNewPasswordForm onSubmit={onSubmit} />
    </Card>
  )
}

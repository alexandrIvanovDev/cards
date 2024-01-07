import s from './forgot-password-page.module.scss'

import { ForgotPasswordForm } from '@/components/auth/forgot-password'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const ForgotPasswordPage = () => {
  const onSubmit = () => {}

  return (
    <Card className={s.wrapper}>
      <Typography as="h2" variant="large">
        Forgot your password?
      </Typography>
      <ForgotPasswordForm onSubmit={onSubmit} />
      <Typography variant="body1" className={s.notification}>
        Did you remember your password?
      </Typography>
      <Button variant="link">Try logging in</Button>
    </Card>
  )
}

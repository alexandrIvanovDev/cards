import { Link } from 'react-router-dom'

import s from './forgot-password-page.module.scss'

import { routePaths } from '@/app/providers/router/routePaths.tsx'
import { ForgotPasswordForm } from '@/components/auth/forgot-password'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useRecoverPasswordMutation } from '@/feature/auth'

export const ForgotPasswordPage = () => {
  const [recoverPassword] = useRecoverPasswordMutation()

  return (
    <Card className={s.wrapper}>
      <Typography as="h2" variant="large" className={s.title}>
        Forgot your password?
      </Typography>
      <ForgotPasswordForm onSubmit={recoverPassword} />
      <Typography variant="body1" className={s.notification}>
        Did you remember your password?
      </Typography>
      <Button variant="link" as={Link} to={routePaths.signIn} className={s.btn}>
        Try logging in
      </Button>
    </Card>
  )
}

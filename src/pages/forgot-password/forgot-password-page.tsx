import { Link, useNavigate } from 'react-router-dom'

import s from './forgot-password-page.module.scss'

import { routePaths } from '@/app/providers/router/routePaths.tsx'
import { ForgotPasswordForm } from '@/components/auth/forgot-password'
import { ForgotPasswordFormType } from '@/components/auth/forgot-password/use-forgot-password.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useRecoverPasswordMutation } from '@/feature/auth'

export const ForgotPasswordPage = () => {
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: ForgotPasswordFormType) => {
    await recoverPassword(data)
    navigate(`${routePaths.checkEmail}/${data.email}`)
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <Card className={s.wrapper}>
        <Typography as="h2" variant="large" className={s.title}>
          Forgot your password?
        </Typography>
        <ForgotPasswordForm onSubmit={onSubmit} />
        <Typography variant="body1" className={s.notification}>
          Did you remember your password?
        </Typography>
        <Button variant="link" as={Link} to={routePaths.signIn} className={s.btn}>
          Try logging in
        </Button>
      </Card>
    </>
  )
}

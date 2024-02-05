import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import s from './forgot-password.module.scss'

import { routePaths } from '@/app/providers/router/routePaths.tsx'
import { ForgotPasswordForm } from '@/components/forms/forgot-password'
import { ForgotPasswordFormType } from '@/components/forms/forgot-password/use-forgot-password.ts'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useRecoverPasswordMutation } from '@/feature/auth'

export const ForgotPassword = () => {
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const onSubmit = async (data: ForgotPasswordFormType) => {
    await recoverPassword(data)
    navigate(`${routePaths.checkEmail}/${data.email}`)
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <Card className={s.wrapper}>
        <Typography as="h2" variant="large" className={s.title}>
          {t('Forgot your password?')}
        </Typography>
        <ForgotPasswordForm onSubmit={onSubmit} />
        <Typography variant="body2" className={s.notification}>
          {t('Did you remember your password?')}
        </Typography>
        <Button variant="link" as={Link} to={routePaths.signIn} className={s.btn}>
          {t('Try logging in')}
        </Button>
      </Card>
    </>
  )
}

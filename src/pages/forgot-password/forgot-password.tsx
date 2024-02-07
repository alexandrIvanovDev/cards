import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import s from './forgot-password.module.scss'

import { routePaths } from '@/app/providers/router/routePaths.tsx'
import { ForgotPasswordForm, ForgotPasswordFormType } from '@/components/forms/forgot-password'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useRecoverPasswordMutation } from '@/feature/auth/serivices'

export const ForgotPassword = () => {
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const onSubmit = async (data: ForgotPasswordFormType) => {
    await recoverPassword(data)
    navigate(`${routePaths.checkEmail}/${data.email}`)
  }

  return (
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
  )
}

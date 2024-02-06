import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './sign-in.module.scss'

import { routePaths } from '@/app/providers/router'
import { requestHandler } from '@/common/utils/requestHandler.ts'
import { SignInForm } from '@/components/forms/sign-in'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useMeQuery, useSignInMutation } from '@/feature/auth/auth.service.ts'
import { LoginArgs } from '@/feature/auth/auth.types.ts'

export const SignIn = () => {
  const [signIn, { isLoading }] = useSignInMutation()
  const { data } = useMeQuery()

  const { t } = useTranslation()

  const handleLogin = async (data: LoginArgs) => {
    await requestHandler(async () => {
      await signIn(data).unwrap()
      toast.success(t('You have successfully authorized'))
    })
  }

  if (data?.id) {
    return <Navigate to={routePaths.packs} />
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <Card className={s.wrapper}>
        <Typography as="h2" variant="large">
          {t('Sign In')}
        </Typography>
        <SignInForm onSubmit={handleLogin} />
        <Typography variant="body2" className={s.notification}>
          {t("Don't have an account?")}
        </Typography>
        <Button variant="link" className={s.signUp} as={Link} to={routePaths.signUp}>
          {t('Sign Up')}
        </Button>
      </Card>
    </>
  )
}

import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './sign-in.module.scss'

import { routePaths } from '@/app/providers/router'
import { useAppDispatch } from '@/common/hooks/use-app-dispatch.ts'
import { requestHandler } from '@/common/utils/requestHandler.ts'
import { SignInForm } from '@/components/forms/sign-in'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { setToken } from '@/feature/auth/model/slice'
import { useMeQuery, useSignInMutation } from '@/feature/auth/serivices'
import { LoginArgs } from '@/feature/auth/serivices/auth.types.ts'

export const SignIn = () => {
  const [signIn] = useSignInMutation()

  const { data } = useMeQuery()

  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const handleLogin = async (data: LoginArgs) => {
    await requestHandler(async () => {
      const res = await signIn(data).unwrap()

      if (res.accessToken) {
        dispatch(setToken(res.accessToken))
      }

      toast.success(t('You have successfully authorized'))
    })
  }

  if (data?.id) {
    return <Navigate to={routePaths.packs} />
  }

  return (
    <>
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

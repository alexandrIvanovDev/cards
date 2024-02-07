import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './sign-up.module.scss'

import { routePaths } from '@/app/providers/router/routePaths.tsx'
import { requestHandler } from '@/common/utils/requestHandler.ts'
import { SignUpForm, SignUpFormType } from '@/components/forms/sign-up'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useMeQuery, useSignInMutation, useSignUpMutation } from '@/feature/auth/serivices'

export const SignUp = () => {
  const [signUp] = useSignUpMutation()
  const [signIn] = useSignInMutation()

  const { data: userData } = useMeQuery()

  const { t } = useTranslation()

  const handleSignUp = async (data: SignUpFormType) => {
    const { confirmPassword, ...rest } = data

    await requestHandler(async () => {
      await signUp(rest).unwrap()
      await signIn(rest).unwrap()
      toast.success(t('You have successfully registered'))
    })
  }

  if (userData?.id) {
    return <Navigate to={routePaths.packs} />
  }

  return (
    <Card className={s.wrapper}>
      <Typography as="h2" variant="large">
        {t('Sign Up')}
      </Typography>
      <SignUpForm onSubmit={handleSignUp} />
      <Typography variant="body2" className={s.notification}>
        {t('Already have an account?')}
      </Typography>
      <Button variant="link" as={Link} to={routePaths.signIn} className={s.btn}>
        {t('Sign In')}
      </Button>
    </Card>
  )
}

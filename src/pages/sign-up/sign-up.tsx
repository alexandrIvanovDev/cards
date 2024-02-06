import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './sign-up.module.scss'

import { routePaths } from '@/app/providers/router/routePaths.tsx'
import { requestHandler } from '@/common/utils/requestHandler.ts'
import { SignUpForm } from '@/components/forms/sign-up'
import { SignUpFormType } from '@/components/forms/sign-up/use-sign-up.ts'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useMeQuery, useSignInMutation, useSignUpMutation } from '@/feature/auth'

export const SignUp = () => {
  const [signUp, { isLoading: signUpIsLoading }] = useSignUpMutation()
  const [signIn, { isLoading: signInIsLoading }] = useSignInMutation()
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

  const isLoading = signUpIsLoading || signInIsLoading

  if (userData?.id) {
    return <Navigate to={routePaths.packs} />
  }

  return (
    <Card className={s.wrapper}>
      {isLoading && <ProgressBar />}
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

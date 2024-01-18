import { Link, Navigate } from 'react-router-dom'

import s from './sign-up-page.module.scss'

import { routePaths } from '@/app/providers/router/routePaths.tsx'
import { SignUpForm } from '@/components/auth/sign-up'
import { SignUpFormType } from '@/components/auth/sign-up/use-sign-up.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useMeQuery, useSignInMutation, useSignUpMutation } from '@/feature/auth'

export const SignUpPage = () => {
  const [signUp, { isLoading: signUpIsLoading }] = useSignUpMutation()
  const [signIn, { isLoading: signInIsLoading }] = useSignInMutation()
  const { data: userData } = useMeQuery()

  const handleSignUp = async (data: SignUpFormType) => {
    try {
      const { confirmPassword, ...rest } = data

      await signUp(rest)
      await signIn(rest)
    } catch (e) {
      console.error(e)
    }
  }

  if (userData?.id) {
    return <Navigate to={routePaths.packs} />
  }

  return (
    <Card className={s.wrapper}>
      {(signUpIsLoading || signInIsLoading) && <ProgressBar />}
      <Typography as="h2" variant="large">
        Sign Up
      </Typography>
      <SignUpForm onSubmit={handleSignUp} />
      <Typography variant="body1" className={s.notification}>
        Already have an account?
      </Typography>
      <Button variant="link" as={Link} to={routePaths.signIn} className={s.btn}>
        Sign In
      </Button>
    </Card>
  )
}

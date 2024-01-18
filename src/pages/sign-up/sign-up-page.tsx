import { Link } from 'react-router-dom'

import s from './sign-up-page.module.scss'

import { routePaths } from '@/app/providers/router/routePaths.tsx'
import { SignUpForm } from '@/components/auth/sign-up'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useSignUpMutation } from '@/feature/auth/auth.service.ts'
import { SignUpArgs } from '@/feature/auth/auth.types.ts'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  const handleSignUp = async (data: SignUpArgs) => {
    try {
      const { email, password } = data

      await signUp({ email, password })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card className={s.wrapper}>
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

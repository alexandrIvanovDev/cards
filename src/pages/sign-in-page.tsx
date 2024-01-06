import s from './sign-in-page.module.scss'

import { SignInForm } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const SignInPage = () => {
  const onSubmit = () => {}

  return (
    <Card className={s.wrapper}>
      <Typography as="h1" variant="large">
        Sign In
      </Typography>
      <SignInForm onSubmit={onSubmit} />
      <Typography variant="body1" className={s.notification}>
        {"Don't have an account?"}
      </Typography>
      <Button variant="link" className={s.signUp}>
        Sign Up
      </Button>
    </Card>
  )
}

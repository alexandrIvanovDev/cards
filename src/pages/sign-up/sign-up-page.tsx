import s from './sign-up-page.module.scss'

import { SignUpForm } from '@/components/auth/sign-up'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const SignUpPage = () => {
  const onSubmit = () => {}

  return (
    <Card className={s.wrapper}>
      <Typography as="h2" variant="large">
        Sign Up
      </Typography>
      <SignUpForm onSubmit={onSubmit} />
      <Typography variant="body1" className={s.notification}>
        Already have an account?
      </Typography>
      <Button variant="link">Sign In</Button>
    </Card>
  )
}

import { Link, useParams } from 'react-router-dom'

import s from './check-email.module.scss'

import { routePaths } from '@/app/providers/router'
import { CheckEmailIcon } from '@/assets/icons/CheckEmail.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const CheckEmail = () => {
  const { email } = useParams()

  return (
    <Card className={s.content}>
      <Typography as={'h2'} variant={'large'} className={s.title}>
        Check Email
      </Typography>
      <CheckEmailIcon className={s.icon} />
      <Typography variant={'body2'} className={s.notification}>
        We’ve sent an Email with instructions to
        <br /> {email}
      </Typography>
      <Button as={Link} to={routePaths.signIn} fullWidth>
        <Typography variant={'subtitle2'}>Back to Sign In</Typography>
      </Button>
    </Card>
  )
}

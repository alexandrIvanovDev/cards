import { Link, useNavigate } from 'react-router-dom'

import s from './sign-in-page.module.scss'

import { routePaths } from '@/app/providers/router'
import { SignInForm } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useSignInMutation } from '@/feature/auth/auth.service.ts'
import { LoginArgs } from '@/feature/auth/auth.types.ts'

export const SignInPage = () => {
  const [signIn, { isLoading }] = useSignInMutation()
  const navigate = useNavigate()
  // const { data } = useMeQuery()

  const handleLogin = async (data: LoginArgs) => {
    try {
      await signIn(data)

      navigate(routePaths.packs)
    } catch (e) {
      console.error(e)
    }
  }

  // if (data?.id) {
  //   return <Navigate to={routePaths.packs} />
  // }

  return (
    <>
      {isLoading && <ProgressBar />}
      <Card className={s.wrapper}>
        <Typography as="h2" variant="large">
          Sign In
        </Typography>
        <SignInForm onSubmit={handleLogin} />
        <Typography variant="body1" className={s.notification}>
          {"Don't have an account?"}
        </Typography>
        <Button variant="link" className={s.signUp} as={Link} to={routePaths.signUp}>
          Sign Up
        </Button>
      </Card>
    </>
  )
}

import { useNavigate, useParams } from 'react-router-dom'

import s from './create-new-password-page.module.scss'

import { routePaths } from '@/app/providers/router'
import { CreateNewPasswordForm } from '@/components/auth/create-new-password'
import { CreateNewPasswordFormType } from '@/components/auth/create-new-password/use-create-new-password.tsx'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Typography } from '@/components/ui/typography'
import { useCreateNewPasswordMutation } from '@/feature/auth'

export const CreateNewPasswordPage = () => {
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()

  const { token } = useParams()
  const navigate = useNavigate()

  const onSubmit = async (data: CreateNewPasswordFormType) => {
    await createNewPassword({ token: token as string, ...data })
    navigate(routePaths.signIn)
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <Card className={s.wrapper}>
        <Typography as="h2" variant="large">
          Create new password
        </Typography>
        <CreateNewPasswordForm onSubmit={onSubmit} />
      </Card>
    </>
  )
}

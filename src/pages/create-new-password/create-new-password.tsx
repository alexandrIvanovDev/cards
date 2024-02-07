import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './create-new-password.module.scss'

import { routePaths } from '@/app/providers/router'
import { requestHandler } from '@/common/utils/requestHandler.ts'
import {
  CreateNewPasswordForm,
  CreateNewPasswordFormType,
} from '@/components/forms/create-new-password'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useCreateNewPasswordMutation } from '@/feature/auth/serivices'

export const CreateNewPassword = () => {
  const [createNewPassword] = useCreateNewPasswordMutation()

  const { t } = useTranslation()

  const { token } = useParams()
  const navigate = useNavigate()

  const onSubmit = async (data: CreateNewPasswordFormType) => {
    await requestHandler(async () => {
      await createNewPassword({ token: token as string, ...data }).unwrap()
      toast.success(t('The password has been changed'))
      navigate(routePaths.signIn)
    })
  }

  return (
    <Card className={s.wrapper}>
      <Typography as="h2" variant="large">
        {t('Create New Password')}
      </Typography>
      <CreateNewPasswordForm onSubmit={onSubmit} />
    </Card>
  )
}

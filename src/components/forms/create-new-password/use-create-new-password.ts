import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { genericPasswordConstraint } from '@/common/data/validationFields.ts'

const createNewPasswordSchema = z.object({
  password: genericPasswordConstraint,
})

export type CreateNewPasswordFormType = z.infer<typeof createNewPasswordSchema>

export const useCreateNewPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateNewPasswordFormType>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  return { handleSubmit, control, errors }
}

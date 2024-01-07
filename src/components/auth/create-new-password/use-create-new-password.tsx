import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createNewPasswordSchema = z.object({
  password: z.string().min(3, { message: 'String must contain at least 3 character(s)' }),
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

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateUserSchema = z.object({
  name: z.string().min(3, 'String must contain at least 3 character(s)'),
  avatar: z.string().optional(),
})

export type UpdateUserFormType = z.infer<typeof updateUserSchema>

export const useEditProfile = (name: string = '') => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateUserFormType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name,
    },
  })

  return { handleSubmit, control, errors }
}

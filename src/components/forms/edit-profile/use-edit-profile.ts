import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { genericAvatarConstraint, genericNameConstraint } from '@/common/data/validation.ts'

const updateUserSchema = z.object({
  name: genericNameConstraint,
  avatar: genericAvatarConstraint,
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

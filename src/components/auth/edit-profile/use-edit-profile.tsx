import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const nickNameSchema = z.object({
  nickName: z.string().min(3, 'String must contain at least 3 character(s)'),
})

export type NickNameFormType = z.infer<typeof nickNameSchema>

export const useEditProfile = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NickNameFormType>({
    resolver: zodResolver(nickNameSchema),
    defaultValues: {
      nickName: '',
    },
  })

  return { handleSubmit, control, errors }
}

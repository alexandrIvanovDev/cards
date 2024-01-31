import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: 'String must contain at least 3 character(s)' }),
  rememberMe: z.boolean(),
})

export type SignInFormType = z.infer<typeof signInSchema>

export const useSignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return { handleSubmit, control, errors }
}

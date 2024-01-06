import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3, { message: 'String must contain at least 3 character(s)' }),
    confirmPassword: z.string().min(3, { message: 'String must contain at least 3 character(s)' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpFormType = z.infer<typeof signUpSchema>

export const useSignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return { handleSubmit, control, errors }
}

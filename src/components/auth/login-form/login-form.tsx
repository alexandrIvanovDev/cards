import { CSSProperties } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(4, { message: 'Password less than 4' }),
  rememberMe: z.boolean(),
})

export type LoginFormType = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormType> = data => {
    console.log(data)
  }

  const styles: CSSProperties = {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }

  return (
    <>
      <DevTool control={control} />

      <form style={styles} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name={'email'}
          control={control}
          label="Email"
          error={errors.email?.message}
        />
        <ControlledTextField
          name={'password'}
          control={control}
          label="Password"
          error={errors.password?.message}
        />
        <ControlledCheckbox name={'rememberMe'} control={control} label="remember Me" />
        <Button>Send</Button>
      </form>
    </>
  )
}

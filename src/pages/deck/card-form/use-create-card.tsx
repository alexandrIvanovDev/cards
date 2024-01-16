import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createCardSchema = z.object({
  question: z.string().min(3, { message: 'Question must be longer than or equal to 3 characters' }),
  answer: z.string().min(3, { message: 'Answer must be longer than or equal to 3 characters' }),
})

export type CreateCardFormType = z.infer<typeof createCardSchema>

export const useCreateCard = (question: string = '', answer: string = '') => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCardFormType>({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      question: question,
      answer: answer,
    },
  })

  return { control, handleSubmit, errors }
}

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  genericAnswerConstraint,
  genericQuestionConstraint,
} from '@/common/data/validationFields.ts'

const createCardSchema = z.object({
  question: genericQuestionConstraint,
  answer: genericAnswerConstraint,
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

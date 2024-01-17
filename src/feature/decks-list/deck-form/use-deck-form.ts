import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CreateDeckArgs } from '@/services/cards.types.ts'

const deckSchema = z.object({
  name: z.string().min(3, { message: 'Name must be longer than or equal to 3 characters' }),
  isPrivate: z.boolean(),
})

export type DeckFormType = z.infer<typeof deckSchema>

export const useDeckForm = (data: CreateDeckArgs) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeckFormType>({
    resolver: zodResolver(deckSchema),
    defaultValues: { ...data },
  })

  return { control, handleSubmit, errors }
}

import { FC } from 'react'

import s from './card-form.module.scss'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { CreateCardFormType, useCreateCard } from '@/pages/deck/card-form/use-create-card.tsx'

type Props = {
  onSubmit: (data: CreateCardFormType) => void
  closeModal: () => void
  question?: string
  answer?: string
  buttonText?: string
}

export const CardForm: FC<Props> = props => {
  const { onSubmit, closeModal, answer, question, buttonText } = props

  const { control, handleSubmit, errors } = useCreateCard(question, answer)

  return (
    <form className={s.modalContent} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        label="Question"
        control={control}
        name={'question'}
        error={errors?.question?.message}
      />
      <ControlledTextField
        label="Answer"
        control={control}
        name={'answer'}
        error={errors?.answer?.message}
      />
      <div className={s.modalButtons}>
        <Button type="button" variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">{buttonText}</Button>
      </div>
    </form>
  )
}

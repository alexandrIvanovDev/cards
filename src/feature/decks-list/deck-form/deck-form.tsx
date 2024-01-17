import { FC } from 'react'

import s from './deck-form.module.scss'

import { ControlledCheckbox, ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { DeckFormType, useDeckForm } from '@/feature/decks-list/deck-form/use-deck-form.ts'
import { CreateDeckArgs } from '@/services/cards.types.ts'

type Props = {
  onSubmit: (data: DeckFormType) => void
  setIsOpen: (value: boolean) => void
  btnText: string
  formData?: CreateDeckArgs
  disabled?: boolean
}

export const DeckForm: FC<Props> = ({ onSubmit, setIsOpen, btnText, formData, disabled }) => {
  const { control, handleSubmit, errors } = useDeckForm(formData as CreateDeckArgs)

  return (
    <form className={s.modalContent} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        label="Name pack"
        control={control}
        name={'name'}
        error={errors.name?.message}
        autoFocus
      />
      <ControlledCheckbox control={control} name={'isPrivate'} label="Private pack" />
      <div className={s.modalButtons}>
        <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={disabled}>
          {btnText}
        </Button>
      </div>
    </form>
  )
}

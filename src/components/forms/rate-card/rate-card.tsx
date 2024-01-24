import { FC } from 'react'

import { useForm } from 'react-hook-form'

import s from './rate-card.module.scss'

import { ControlledRadio } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { RadioType } from '@/components/ui/radio-group'

export type RateCardType = { grade: string }

const radioButtons: Array<RadioType> = [
  { value: '1', label: 'Did not know' },
  { value: '2', label: 'Forgot' },
  { value: '3', label: 'A lot of thought' },
  { value: '4', label: 'Сonfused' },
  { value: '5', label: 'Knew the answer' },
]

type Props = {
  onSubmit: (data: RateCardType) => void
}

export const RateCard: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<RateCardType>({ defaultValues: { grade: '1' } })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledRadio name={'grade'} control={control} radioButtons={radioButtons} />
      <Button className={s.btn}>Next question</Button>
    </form>
  )
}

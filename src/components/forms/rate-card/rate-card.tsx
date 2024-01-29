import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './rate-card.module.scss'

import { routePaths } from '@/app/providers/router'
import { ControlledRadio } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { RadioType } from '@/components/ui/radio-group'
import { Typography } from '@/components/ui/typography'

export type RateCardType = { grade: string }

const radioButtons: Array<RadioType> = [
  { value: '1', label: 'Did not know' },
  { value: '2', label: 'Forgot' },
  { value: '3', label: 'A lot of thought' },
  { value: '4', label: 'Сonfused' },
  { value: '5', label: 'Knew the answer' },
]

type Props = {
  deckId: string
  onSubmit: (data: RateCardType) => void
}

export const RateCard = ({ onSubmit, deckId }: Props) => {
  const { control, handleSubmit } = useForm<RateCardType>({ defaultValues: { grade: '1' } })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledRadio name={'grade'} control={control} radioButtons={radioButtons} />
      <div className={s.btns}>
        <Button>
          <Typography variant={'subtitle2'}>Next question</Typography>
        </Button>
        <Button as={Link} to={`${routePaths.packs}/${deckId}`} variant={'secondary'}>
          <Typography variant={'subtitle2'}>Complete the training</Typography>
        </Button>
      </div>
    </form>
  )
}

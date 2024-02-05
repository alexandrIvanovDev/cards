import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import s from './rate-card.module.scss'

import { ControlledRadio } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { RadioType } from '@/components/ui/radio-group'
import { Typography } from '@/components/ui/typography'

export type RateCardType = { grade: string }

const radioButtons: Array<RadioType> = [
  { value: '1', label: 'Did not know' },
  { value: '2', label: 'Forgot' },
  { value: '3', label: 'A lot of thought' },
  { value: '4', label: 'Confused' },
  { value: '5', label: 'Knew the answer' },
]

type Props = {
  onSubmit: (data: RateCardType) => void
}

export const RateCard = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<RateCardType>({ defaultValues: { grade: '1' } })

  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledRadio name={'grade'} control={control} radioButtons={radioButtons} />
      <div className={s.btns}>
        <Button>
          <Typography variant={'subtitle2'}>{t('Next question')}</Typography>
        </Button>
        <Button onClick={() => navigate(-1)} variant={'secondary'}>
          <Typography variant={'subtitle2'}>{t('Complete the training')}</Typography>
        </Button>
      </div>
    </form>
  )
}

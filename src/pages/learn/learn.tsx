import { useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { RateCard, RateCardType } from '@/components/forms/rate-card/rate-card.tsx'
import { BackButton } from '@/components/ui/back-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useGetRandomCardQuery, useRateCardMutation } from '@/services/cards.service.ts'
import { useGetDeckByIdQuery } from '@/services/deck.service.ts'

export const Learn = () => {
  const params = useParams()
  const id = params.id as string
  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const { data: card } = useGetRandomCardQuery({ id })
  const { data: deck } = useGetDeckByIdQuery({ id })

  const [rateCard] = useRateCardMutation()

  const onSubmit = async (data: RateCardType) => {
    await rateCard({ id: id, cardId: card!.id, grade: +data.grade })
    setIsShowAnswer(false)
  }

  return (
    <div className={s.content}>
      <BackButton />
      <Card className={s.card}>
        <Typography as={'h2'} variant={'large'} className={s.title}>
          Learn {deck?.name}
        </Typography>
        <div className={s.questionWrapper}>
          <Typography variant={'subtitle1'}>Question:</Typography>
          <Typography variant={'body1'}>{card?.question}</Typography>
        </div>

        <Typography variant={'body2'} className={s.attempts}>
          Number of attempts: {card?.shots}
        </Typography>
        {!isShowAnswer ? (
          <Button onClick={() => setIsShowAnswer(true)}>Show answer</Button>
        ) : (
          <div className={s.answerWrapper}>
            <div className={s.questionWrapper}>
              <Typography variant={'subtitle1'}>Answer:</Typography>
              <Typography variant={'body1'}>{card?.answer}</Typography>
            </div>
            <Typography variant={'subtitle1'}>Rate yourself:</Typography>
            <RateCard onSubmit={onSubmit} />
          </div>
        )}
      </Card>
    </div>
  )
}

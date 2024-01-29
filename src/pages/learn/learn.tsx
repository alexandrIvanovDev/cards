import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { routePaths } from '@/app/providers/router'
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
          <div className={s.questionText}>
            <Typography variant={'subtitle1'}>Question:</Typography>
            <Typography variant={'body1'} className={s.question}>
              {card?.question}
            </Typography>
          </div>
          {card?.questionImg && (
            <img src={card.questionImg} alt="questionImg" className={s.questionImg} />
          )}
        </div>

        <Typography variant={'body2'} className={s.attempts}>
          Number of attempts: {card?.shots}
        </Typography>

        {!isShowAnswer ? (
          <div className={s.btns}>
            <Button onClick={() => setIsShowAnswer(true)}>
              <Typography variant={'subtitle2'}>Show answer</Typography>
            </Button>
            <Button as={Link} to={`${routePaths.packs}/${id}`} variant={'secondary'}>
              <Typography variant={'subtitle2'}>Complete the training</Typography>
            </Button>
          </div>
        ) : (
          <div className={s.answerBlock}>
            <div className={s.answerWrapper}>
              <Typography variant={'subtitle1'}>Answer:</Typography>
              <Typography variant={'body1'} className={s.answer}>
                {card?.answer}
              </Typography>
            </div>
            {card?.answerImg && (
              <img src={card.answerImg} alt="answerImg" className={s.answerImg} />
            )}
            <Typography variant={'subtitle1'}>Rate yourself:</Typography>
            <RateCard onSubmit={onSubmit} deckId={id} />
          </div>
        )}
      </Card>
    </div>
  )
}

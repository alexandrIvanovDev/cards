import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { RateCard, RateCardType } from '@/components/forms/rate-card'
import { BackButton } from '@/components/ui/back-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { useGetRandomCardQuery, useRateCardMutation } from '@/feature/deck/services/deck.service.ts'
import { useGetDeckByIdQuery } from '@/feature/decks-list/services/decks-list.service.ts'

export const Learn = () => {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id as string
  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const { t } = useTranslation()

  const { data: card, isLoading: cardIsLoading } = useGetRandomCardQuery({ id })
  const { data: deck } = useGetDeckByIdQuery({ id })

  const [rateCard] = useRateCardMutation()

  const onSubmit = async (data: RateCardType) => {
    await rateCard({ id: id, cardId: card!.id, grade: +data.grade })
    setIsShowAnswer(false)
  }

  if (cardIsLoading) {
    return <Loader />
  }

  return (
    <div className={s.content}>
      <BackButton />
      <Card className={s.card}>
        <Typography as={'h2'} variant={'large'} className={s.title}>
          {t('Learn')} {deck?.name}
        </Typography>
        <div className={s.questionWrapper}>
          <div className={s.questionText}>
            <Typography variant={'subtitle1'}>{t('Question')}:</Typography>
            <Typography variant={'body1'} className={s.question}>
              {card?.question}
            </Typography>
          </div>
          {card?.questionImg && (
            <img src={card.questionImg} alt="questionImg" className={s.questionImg} />
          )}
        </div>

        <Typography variant={'body2'} className={s.attempts}>
          {t('Number of attempts')}: {card?.shots}
        </Typography>

        {!isShowAnswer ? (
          <div className={s.btns}>
            <Button onClick={() => setIsShowAnswer(true)}>
              <Typography variant={'subtitle2'}>{t('Show answer')}</Typography>
            </Button>
            <Button onClick={() => navigate(-1)} variant={'secondary'}>
              <Typography variant={'subtitle2'}>{t('Complete the training')}</Typography>
            </Button>
          </div>
        ) : (
          <div className={s.answerBlock}>
            <div className={s.answerWrapper}>
              <Typography variant={'subtitle1'}>{t('Answer')}:</Typography>
              <Typography variant={'body1'} className={s.answer}>
                {card?.answer}
              </Typography>
            </div>
            {card?.answerImg && (
              <img src={card.answerImg} alt="answerImg" className={s.answerImg} />
            )}
            <Typography variant={'subtitle1'}>{t('Rate yourself')}:</Typography>
            <RateCard onSubmit={onSubmit} />
          </div>
        )}
      </Card>
    </div>
  )
}

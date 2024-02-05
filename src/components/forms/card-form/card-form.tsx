import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import s from './card-form.module.scss'
import { CreateCardFormType, useCreateCard } from './use-create-card.ts'

import { ImageIcon } from '@/assets/icons/Image.tsx'
import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Uploader } from '@/components/ui/uploader'

type Props = {
  onSubmit: (data: FormData) => void
  closeModal: () => void
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
  buttonText?: string
}

export const CardForm = (props: Props) => {
  const { onSubmit, closeModal, answer, question, buttonText, questionImg, answerImg } = props

  const { control, handleSubmit, errors } = useCreateCard(question, answer)

  const { t } = useTranslation()

  const [questionFile, setQuestionFile] = useState<File | null>(null)
  const [answerFile, setAnswerFile] = useState<File | null>(null)

  let questionUrl = questionFile && URL.createObjectURL(questionFile)
  let answerUrl = answerFile && URL.createObjectURL(answerFile)

  if (!questionUrl && questionImg) {
    questionUrl = questionImg
  }

  if (!answerUrl && answerImg) {
    answerUrl = answerImg
  }

  const onSubmitData = (data: CreateCardFormType) => {
    const form = new FormData()

    form.append('question', data.question)
    form.append('answer', data.answer)
    questionFile && form.append('questionImg', questionFile)
    answerFile && form.append('answerImg', answerFile)

    onSubmit(form)
  }

  return (
    <form className={s.modalContent} onSubmit={handleSubmit(onSubmitData)}>
      <ControlledTextField
        label={t('Question')}
        control={control}
        name={'question'}
        error={errors?.question?.message}
      />
      {questionUrl && <img src={questionUrl} alt={'question cover'} className={s.cover} />}
      <Uploader loadFile={setQuestionFile}>
        <ImageIcon className={s.icon} />
        <Typography variant={'subtitle2'}>
          {questionUrl ? t('Change cover') : t('Upload Image')}
        </Typography>
      </Uploader>
      <ControlledTextField
        label={t('Answer')}
        control={control}
        name={'answer'}
        error={errors?.answer?.message}
      />
      {answerUrl && <img src={answerUrl} alt={'answer cover'} className={s.cover} />}
      <Uploader loadFile={setAnswerFile}>
        <ImageIcon className={s.icon} />
        <Typography variant={'subtitle2'}>
          {answerUrl ? t('Change cover') : t('Upload Image')}
        </Typography>
      </Uploader>
      <div className={s.modalButtons}>
        <Button type="button" variant="secondary" onClick={closeModal}>
          <Typography variant={'subtitle2'} as={'span'}>
            {t('Cancel')}
          </Typography>
        </Button>
        <Button type="submit">
          <Typography variant={'subtitle2'} as={'span'}>
            {buttonText}
          </Typography>
        </Button>
      </div>
    </form>
  )
}

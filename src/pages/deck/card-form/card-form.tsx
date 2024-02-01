import { FC, useState } from 'react'

import s from './card-form.module.scss'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Uploader } from '@/components/ui/uploader'
import { CreateCardFormType, useCreateCard } from '@/pages/deck/card-form/use-create-card.tsx'

type Props = {
  onSubmit: (data: FormData) => void
  closeModal: () => void
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
  buttonText?: string
}

export const CardForm: FC<Props> = props => {
  let { onSubmit, closeModal, answer, question, buttonText, questionImg, answerImg } = props

  const { control, handleSubmit, errors } = useCreateCard(question, answer)

  const [questionFile, setQuestionFile] = useState<File | null>(null)
  const [answerFile, setAnswerFile] = useState<File | null>(null)

  const questionUrl = questionFile && URL.createObjectURL(questionFile)
  const answerUrl = answerFile && URL.createObjectURL(answerFile)

  if (!questionImg && questionUrl) {
    questionImg = questionUrl
  }

  if (!answerImg && answerUrl) {
    answerImg = answerUrl
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
        label="Question"
        control={control}
        name={'question'}
        error={errors?.question?.message}
      />
      {questionImg && <img src={questionImg} alt={'question cover'} className={s.cover} />}
      <Uploader setFile={setQuestionFile} />
      <ControlledTextField
        label="Answer"
        control={control}
        name={'answer'}
        error={errors?.answer?.message}
      />
      {answerImg && <img src={answerImg} alt={'answer cover'} className={s.cover} />}
      <Uploader setFile={setAnswerFile} />
      <div className={s.modalButtons}>
        <Button type="button" variant="secondary" onClick={closeModal}>
          <Typography variant={'subtitle2'} as={'span'}>
            Cancel
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

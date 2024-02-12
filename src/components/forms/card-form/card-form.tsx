import { useEffect, useState } from 'react'

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

  const [questionUrl, setQuestionUrl] = useState<string | null>(questionImg || null)
  const [answerUrl, setAnswerUrl] = useState<string | null>(answerImg || null)

  const onSubmitData = (data: CreateCardFormType) => {
    const form = new FormData()

    form.append('question', data.question)
    form.append('answer', data.answer)

    if (questionUrl === null) {
      form.append('questionImg', '')
    }
    if (answerUrl === null) {
      form.append('answerImg', '')
    }
    if (questionUrl && questionFile) {
      form.append('questionImg', questionFile)
    }
    if (answerUrl && answerFile) {
      form.append('answerImg', answerFile)
    }

    onSubmit(form)
  }

  const removeQuestionCover = () => {
    setQuestionUrl(null)
    setQuestionFile(null)
  }

  const removeAnswerCover = () => {
    setAnswerUrl(null)
    setQuestionFile(null)
  }

  useEffect(() => {
    if (questionFile) {
      setQuestionUrl(URL.createObjectURL(questionFile))
    }
    if (answerFile) {
      setAnswerUrl(URL.createObjectURL(answerFile))
    }
  }, [questionFile, answerFile])

  return (
    <form className={s.modalContent} onSubmit={handleSubmit(onSubmitData)}>
      <ControlledTextField
        label={t('Question')}
        control={control}
        name={'question'}
        error={errors?.question?.message}
      />
      {questionUrl && <img src={questionUrl as string} alt={'cover'} className={s.cover} />}
      <div className={s.btnWrapper}>
        {questionUrl && (
          <Button
            variant={'secondary'}
            onClick={removeQuestionCover}
            type={'button'}
            className={s.btn}
          >
            <Typography variant={'subtitle2'}>{t('Delete cover')}</Typography>
          </Button>
        )}
        <Uploader loadFile={setQuestionFile}>
          <ImageIcon className={s.icon} />
          <Typography variant={'subtitle2'}>
            {questionUrl ? t('Change cover') : t('Upload Image')}
          </Typography>
        </Uploader>
      </div>

      <ControlledTextField
        label={t('Answer')}
        control={control}
        name={'answer'}
        error={errors?.answer?.message}
      />
      {answerUrl && <img src={answerUrl as string} alt={'cover'} className={s.cover} />}
      <div className={s.btnWrapper}>
        {answerUrl && (
          <Button
            variant={'secondary'}
            onClick={removeAnswerCover}
            type={'button'}
            className={s.btn}
          >
            <Typography variant={'subtitle2'}>{t('Delete cover')}</Typography>
          </Button>
        )}
        <Uploader loadFile={setAnswerFile}>
          <ImageIcon className={s.icon} />
          <Typography variant={'subtitle2'}>
            {answerUrl ? t('Change cover') : t('Upload Image')}
          </Typography>
        </Uploader>
      </div>

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

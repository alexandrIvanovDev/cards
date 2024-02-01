import { FC } from 'react'

import { Modal, ModalProps } from '@/components/ui/modal'
import { CardForm } from '@/pages/deck/card-form/card-form.tsx'

type Props = ModalProps & {
  onSubmit: (data: FormData) => void
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
  buttonText: string
}
export const CardModal: FC<Props> = props => {
  const { onSubmit, question, answer, buttonText, answerImg, questionImg, onOpenChange, ...rest } =
    props

  const closeModal = () => {
    onOpenChange(!open)
  }

  return (
    <Modal onOpenChange={onOpenChange} {...rest}>
      <CardForm
        onSubmit={onSubmit}
        closeModal={closeModal}
        answer={answer}
        question={question}
        answerImg={answerImg}
        questionImg={questionImg}
        buttonText={buttonText}
      />
    </Modal>
  )
}

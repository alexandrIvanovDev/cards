import { CardForm } from '@/components/forms/card-form'
import { Modal, ModalProps } from '@/components/ui/modal'

type Props = ModalProps & {
  onSubmit: (data: FormData) => void
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
  buttonText: string
}
export const CardModal = (props: Props) => {
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

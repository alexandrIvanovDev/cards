import { FC } from 'react'

import { Modal, ModalProps } from '@/components/ui/modal'
import { CardForm } from '@/pages/deck/card-form/card-form.tsx'
import { CreateCardFormType } from '@/pages/deck/card-form/use-create-card.tsx'

type Props = ModalProps & {
  onSubmit: (data: CreateCardFormType) => void
  question?: string
  answer?: string
  buttonText: string
}
export const CardModal: FC<Props> = props => {
  const { onSubmit, question, answer, buttonText, onOpenChange, ...rest } = props

  const closeModal = () => {
    onOpenChange(!open)
  }

  return (
    <Modal
      // open={open}
      onOpenChange={onOpenChange}
      // trigger={trigger}
      // title={title}
      // className={className}
      {...rest}
    >
      <CardForm
        onSubmit={onSubmit}
        closeModal={closeModal}
        answer={answer}
        question={question}
        buttonText={buttonText}
      />
    </Modal>
  )
}

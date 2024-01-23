import { FC } from 'react'

import s from './delete-entity-modal.module.scss'

import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

type Props = ModalProps & {
  text: string
  btnText: string
  callback: () => void
  disabled?: boolean
}

export const DeleteEntityModal: FC<Props> = props => {
  const { text, btnText, open, onOpenChange, callback, disabled, ...rest } = props

  return (
    <Modal open={open} onOpenChange={onOpenChange} {...rest}>
      <div className={s.deleteCardModal}>
        <Typography>Do you really want to remove {text}</Typography>
        <div className={s.btns}>
          <Button variant="secondary" onClick={() => onOpenChange(!open)}>
            Cancel
          </Button>
          <Button onClick={callback} disabled={disabled}>
            {btnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

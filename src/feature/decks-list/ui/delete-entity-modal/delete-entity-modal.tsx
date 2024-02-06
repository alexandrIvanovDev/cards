import { useTranslation } from 'react-i18next'

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

export const DeleteEntityModal = (props: Props) => {
  const { text, btnText, open, onOpenChange, callback, disabled, ...rest } = props

  const { t } = useTranslation()

  return (
    <Modal open={open} onOpenChange={onOpenChange} {...rest}>
      <div className={s.deleteCardModal}>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Typography>
          {t('Do you really want to remove')} {text}
        </Typography>
        <div className={s.btns}>
          <Button variant="secondary" onClick={() => onOpenChange(!open)}>
            <Typography variant={'subtitle2'} as={'span'}>
              {t('Cancel')}
            </Typography>
          </Button>
          <Button onClick={callback} disabled={disabled}>
            <Typography variant={'subtitle2'} as={'span'}>
              {btnText}
            </Typography>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

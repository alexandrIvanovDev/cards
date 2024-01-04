import { FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { CloseIcon } from '@/assets/icons/CloseIcon.tsx'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type Props = {
  open: boolean
  onOpenChange: (value: boolean) => void
  trigger: ReactNode
  title?: string
  children?: ReactNode
}

export const Modal: FC<Props> = ({ open, onOpenChange, title, children, trigger }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content forceMount asChild>
          <Card className={s.content}>
            {title && (
              <div className={s.titleWrapper}>
                <Typography as="h2" variant="h2" className={s.title}>
                  {title}
                </Typography>
                <Dialog.Close className={s.close}>
                  <CloseIcon />
                </Dialog.Close>
              </div>
            )}
            {children}
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

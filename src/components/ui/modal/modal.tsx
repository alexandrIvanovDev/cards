import { ElementRef, FC, forwardRef, ReactNode } from 'react'

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

// TODO need to finish ref
export const Modal: FC<Props> = forwardRef<ElementRef<typeof Dialog.Root>, Props>(
  ({ open, onOpenChange, title, children, trigger }, ref) => {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={s.overlay} />
          <div ref={ref}>
            <Dialog.Content forceMount asChild ref={ref}>
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
                <div className={s.childrenWrapper}>{children}</div>
              </Card>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)

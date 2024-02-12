import { ElementRef, forwardRef, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'

import s from './modal.module.scss'

import { CloseIcon } from '@/assets/icons/CloseIcon.tsx'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export type ModalProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  trigger?: ReactNode
  title?: string
  children?: ReactNode
  className?: string
}

export const Modal = forwardRef<ElementRef<'div'>, ModalProps>(
  ({ open, onOpenChange, title, children, trigger, className }, ref) => {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {trigger && (
          <Dialog.Trigger asChild className={className}>
            {trigger}
          </Dialog.Trigger>
        )}
        <Dialog.Portal>
          <Dialog.Overlay className={s.overlay}>
            <div ref={ref}>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <Dialog.Content forceMount asChild ref={ref}>
                      <Card className={s.content}>
                        {title && (
                          <div className={s.titleWrapper}>
                            <Typography as="h3" variant="h3" className={s.title}>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)

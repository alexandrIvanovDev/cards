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

const modal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  closed: { opacity: 0 },
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
        <AnimatePresence>
          {open && (
            <Dialog.Portal>
              <Dialog.Overlay asChild>
                <motion.div
                  animate={{ opacity: 1 }}
                  className={s.overlay}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  {/*</Dialog.Overlay>*/}

                  {/*<Dialog.Overlay>*/}
                  {/*  /!*<div ref={ref}>*!/*/}
                  {/*  <motion.div*/}
                  {/*    initial={{ opacity: 0 }}*/}
                  {/*    animate={{ opacity: 1 }}*/}
                  {/*    exit={{ opacity: 0 }}*/}
                  {/*    className={s.overlay}*/}
                  {/*  />*/}
                  {/*</Dialog.Overlay>*/}
                  <Dialog.Content forceMount asChild ref={ref}>
                    <motion.div
                      animate={'visible'}
                      exit={'closed'}
                      initial={'hidden'}
                      variants={modal}
                    >
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
                    </motion.div>
                  </Dialog.Content>
                </motion.div>
                {/*</div>*/}
              </Dialog.Overlay>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    )
  }
)

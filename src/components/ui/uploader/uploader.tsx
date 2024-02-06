import { ChangeEvent, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './uploader.module.scss'

import { genericFileConstraints } from '@/common/data/validationFields.ts'
import { notificationHandler } from '@/common/utils/notification-handler.ts'
import { Button } from '@/components/ui/button'

type Props = {
  loadFile: (value: File) => void
  children: ReactNode
  className?: string
}

export const Uploader = ({ children, className, loadFile }: Props) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0]

      try {
        genericFileConstraints.parse(file)
        loadFile(file)
      } catch (e) {
        notificationHandler(e)
      }
    }
  }

  return (
    <Button as={'label'} variant={'secondary'} className={clsx(s.label, className)}>
      {children}
      <input type="file" className={s.input} onChange={handleFileChange} />
    </Button>
  )
}

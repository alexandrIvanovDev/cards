import { ChangeEvent, useId } from 'react'

import s from './uploader.module.scss'

import { ImageIcon } from '@/assets/icons/Image.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  // file: File | null
  setFile: (value: File | null) => void
}

export const Uploader = ({ setFile }: Props) => {
  const id = useId()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setFile(e.currentTarget.files[0])
    }
  }

  return (
    <Button as={'label'} variant={'secondary'} htmlFor={id} className={s.label}>
      <ImageIcon className={s.icon} />
      <Typography variant={'subtitle2'}>Upload file</Typography>
      <input type="file" id={id} className={s.input} onChange={handleFileChange} />
    </Button>
  )
}

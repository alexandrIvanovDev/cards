import { FC } from 'react'

import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

import s from './back-button.module.scss'

import { ArrowBackIcon } from '@/assets/icons/ArrowBack.tsx'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  className?: string
}

export const BackButton: FC<Props> = ({ className }) => {
  return (
    <Button as={Link} to={'..'} variant="link" className={clsx(s.btnBack, className)}>
      <ArrowBackIcon className={s.iconBack} /> <Typography>Back to previous page</Typography>
    </Button>
  )
}

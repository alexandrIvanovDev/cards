import { FC } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

import { getTheFirstNameLetters } from '@/common/utils/getTheFirstNameLetters.ts'

type Props = {
  userName: string
  img?: string
  className?: string
}

export const Avatar: FC<Props> = ({ img, userName, className }) => {
  const name = getTheFirstNameLetters(userName)
  const classes = { root: clsx(s.root, className) }

  return (
    <AvatarRadix.Root className={classes.root}>
      <AvatarRadix.Image className={s.avatarImg} src={img} alt="avatar" />
      <AvatarRadix.Fallback className={s.fallback}>{name}</AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}

import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, Props>(({ className, ...rest }, ref) => {
  const mainClass = clsx(s.main, className)

  return <div className={mainClass} ref={ref} {...rest}></div>
})

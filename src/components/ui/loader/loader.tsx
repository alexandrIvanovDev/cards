import { ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import s from './loader.module.scss'

import { LoaderSpinner } from '@/assets/icons/Loader.tsx'

export const Loader: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...rest }) => {
  const mainClass = clsx(s.loader, className)

  return (
    <div className={mainClass} {...rest}>
      <LoaderSpinner />
    </div>
  )
}

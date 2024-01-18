import { ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import s from './loader.module.scss'

import { LoaderSpinner } from '@/assets/icons/Loader.tsx'

export const Loader: FC<ComponentPropsWithoutRef<'div'>> = ({ className, ...rest }) => {
  return (
    <div className={clsx(s.loader, className)} {...rest}>
      <LoaderSpinner />
    </div>
  )
}

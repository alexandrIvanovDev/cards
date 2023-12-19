import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropdown.module.scss'

import { MoreIcon } from '@/assets/icons/More.tsx'

type Props = {
  children: ReactNode
  trigger?: ReactNode
  align?: 'end' | 'center' | 'start'
}

export const Dropdown: FC<Props> = ({ children, trigger, align = 'end' }) => {
  return (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild className={s.trigger}>
        {trigger ?? (
          <button>
            <MoreIcon className={s.icon} />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={-5} className={s.content} align={align}>
          {children}
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

type ItemPropsWithIcon = {
  icon: ReactNode
  text: string
  onClick?: () => void
}

export const DropDownItemWithIcon: FC<ItemPropsWithIcon> = ({ icon, text, onClick }) => {
  return (
    <>
      <DropdownMenu.Item className={s.item} onClick={onClick}>
        {icon}
        <span>{text}</span>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.separator} />
    </>
  )
}

type ItemProps = {
  children: ReactNode
}

export const DropDownItem: FC<ItemProps> = ({ children }) => {
  const classes = clsx(s.item, s.profileItem)

  return (
    <>
      <DropdownMenu.Item className={classes} onSelect={e => e.preventDefault()}>
        {children}
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.separator} />
    </>
  )
}

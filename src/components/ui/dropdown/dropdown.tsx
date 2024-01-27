import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropdown.module.scss'

import { MoreIcon } from '@/assets/icons/More.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  children: ReactNode
  trigger?: ReactNode
  align?: 'end' | 'center' | 'start'
  className?: string
}

export const Dropdown: FC<Props> = ({ children, trigger, align = 'end', className }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className={s.trigger}>
        {trigger ?? (
          <button>
            <MoreIcon className={s.icon} />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={`${s.content} ${className}`} align={align}>
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
  onSelect?: () => void
  disabled?: boolean
}

export const DropDownItemWithIcon: FC<ItemPropsWithIcon> = ({ icon, text, onSelect, disabled }) => {
  return (
    <>
      <DropdownMenu.Item
        className={clsx(s.item, disabled && s.disabledItem)}
        onSelect={onSelect}
        disabled={disabled}
      >
        <div className={s.itemIcon}>{icon}</div>
        <Typography variant={'body2'}>{text}</Typography>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.separator} />
    </>
  )
}

type ItemProps = {
  children: ReactNode
}

export const DropDownItem: FC<ItemProps> = ({ children }) => {
  const itemClass = clsx(s.item, s.profileItem)

  return (
    <>
      <DropdownMenu.Item className={itemClass} onSelect={e => e.preventDefault()}>
        {children}
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.separator} />
    </>
  )
}

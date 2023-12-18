import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'

import { MoreIcon } from '@/assets/icons/More.tsx'

type Props = {
  children: ReactNode
  trigger?: ReactNode
}

export const Dropdown: FC<Props> = ({ children, trigger }) => {
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
        <DropdownMenu.Content sideOffset={5} className={s.content} align="end">
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

type ItemPropsWithIcon = {
  icon: ReactNode
  text: string
}

export const DropDownItemWithIcon: FC<ItemPropsWithIcon> = ({ icon, text }) => {
  return (
    <DropdownMenu.Item className={s.item}>
      <div>{icon}</div>
      <span>{text}</span>
    </DropdownMenu.Item>
  )
}

type ItemProps = {
  children: ReactNode
}

export const DropDownItem: FC<ItemProps> = ({ children }) => {
  return <DropdownMenu.Item className={s.item}>{children}</DropdownMenu.Item>
}

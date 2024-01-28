import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import s from './dropdown.module.scss'

import { MoreIcon } from '@/assets/icons/More.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  children: ReactNode
  trigger?: ReactNode
  align?: 'end' | 'center' | 'start'
  className?: string
}

const ulVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}
const liVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

export const Dropdown = ({ children, trigger, align = 'end', className }: Props) => {
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
        <AnimatePresence>
          <motion.ul
            initial={'hidden'}
            animate={'visible'}
            exit={{ opacity: 0 }}
            variants={ulVariants}
          >
            <DropdownMenu.Content className={`${s.content} ${className}`} align={align}>
              {children}
              <DropdownMenu.Arrow className={s.arrow} />
            </DropdownMenu.Content>
          </motion.ul>
        </AnimatePresence>
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

export const DropDownItemWithIcon = ({ icon, text, onSelect, disabled }: ItemPropsWithIcon) => {
  return (
    <>
      <DropdownMenu.Item
        className={clsx(s.item, disabled && s.disabledItem)}
        onSelect={onSelect}
        disabled={disabled}
      >
        <motion.li variants={liVariants} className={s.animatedItem}>
          <div className={s.itemIcon}>{icon}</div>
          <Typography variant={'body2'}>{text}</Typography>
        </motion.li>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.separator} />
    </>
  )
}

type ItemProps = {
  children: ReactNode
}

export const DropDownItem = ({ children }: ItemProps) => {
  const itemClass = clsx(s.item, s.profileItem)

  return (
    <>
      <DropdownMenu.Item className={itemClass} onSelect={e => e.preventDefault()}>
        <motion.li variants={liVariants} className={s.animatedItem}>
          {children}
        </motion.li>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.separator} />
    </>
  )
}

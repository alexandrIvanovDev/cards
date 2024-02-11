import { FC } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabs.module.scss'

import { Typography } from '@/components/ui/typography'

export type TabType = {
  value: string
  text: string
  disabled?: boolean
}

type TabsProps = {
  tabs: Array<TabType>
  value: string
  onValueChange: (value: string) => void
  className?: string
  label?: string
}

export const Tabs: FC<TabsProps> = ({ tabs, value, className, onValueChange, label }) => {
  return (
    <RadixTabs.Root value={value} className={clsx(s.root, className)} onValueChange={onValueChange}>
      {label && (
        <Typography variant={'body2'} as={'label'} className={s.label}>
          {label}
        </Typography>
      )}
      <RadixTabs.List aria-label="tabs" className={s.tabsList}>
        {tabs.map(tab => (
          <RadixTabs.Trigger
            value={tab.value}
            className={s.tab}
            key={tab.value}
            disabled={tab.disabled}
          >
            <Typography variant={'body1'} as={'span'}>
              {tab.text}
            </Typography>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}

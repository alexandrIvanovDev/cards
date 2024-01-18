import { FC } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'

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
    <RadixTabs.Root
      defaultValue={value}
      className={className}
      onValueChange={onValueChange}
      style={{ position: 'relative' }}
    >
      {label && (
        <Typography as="label" className={s.label}>
          {label}
        </Typography>
      )}
      <RadixTabs.List aria-label="tabs">
        {tabs.map(tab => (
          <RadixTabs.Trigger
            value={tab.value}
            className={s.tab}
            key={tab.value}
            disabled={tab.disabled}
          >
            {tab.text}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}

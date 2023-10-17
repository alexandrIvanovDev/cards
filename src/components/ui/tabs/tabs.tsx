import { FC } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

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
}

export const Tabs: FC<TabsProps> = ({ tabs, value, className, onValueChange }) => {
  return (
    <RadixTabs.Root defaultValue={value} className={className} onValueChange={onValueChange}>
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

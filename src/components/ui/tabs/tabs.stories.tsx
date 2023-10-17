import { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabType } from '@/components/ui/tabs/tabs.tsx'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const tabs: Array<TabType> = [
  { value: 'my', text: 'My Cards' },
  { value: 'all', text: 'All Cards' },
  { value: 'different', text: 'Different Cards' },
]

export const TabsStory: Story = {
  args: {
    tabs,
    value: tabs[0].value,
  },
}

const tabsDisabled: Array<TabType> = [
  { value: 'my', text: 'My Cards' },
  { value: 'all', text: 'All Cards', disabled: true },
  { value: 'different', text: 'Different Cards' },
]

export const TabsWithDisabledItem: Story = {
  args: {
    tabs: tabsDisabled,
    value: tabs[0].value,
  },
}

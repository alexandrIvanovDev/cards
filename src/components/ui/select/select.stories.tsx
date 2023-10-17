import { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select/select.tsx'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'javaScript', label: 'JavaScript' },
  { value: 'swift', label: 'Swift' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
]

export const Primary: Story = {
  args: {
    options,
    placeholder: 'Select language',
  },
}

export const Disabled: Story = {
  args: {
    options,
    placeholder: 'Select language',
    disabled: true,
  },
}
